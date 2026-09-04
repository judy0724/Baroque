#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
巴洛克音響 (ANSBACH ACOUSTIC) 全新旗艦官網本地伺服器
提供靜態檔案代管、CRM 名單收集 API、保固核驗與即時預覽功能
"""

import os
import sys
import json
import urllib.parse
import webbrowser
from http.server import HTTPServer, SimpleHTTPRequestHandler

# 確保 Windows 主控台標準輸出相容 UTF-8
if sys.platform.startswith("win"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

PORT = 8899
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
LEADS_FILE = os.path.join(BASE_DIR, "leads.json")

# 初始化名單檔案
if not os.path.exists(LEADS_FILE):
    initial_leads = [
        {
            "id": "VIP-2026-8821",
            "type": "試聽預約 (VIP Audition)",
            "name": "林宗憲 建築設計師",
            "phone": "0928-123-888",
            "email": "lin.arch@studio.tw",
            "date": "2026-09-08",
            "timeSlot": "14:00 - 15:30 (午後私享席)",
            "preferredEquipment": "ProAc K6 Signature + EC AW 800 M 旗艦單聲道",
            "mediaSource": "黑膠 (LP) + Tidal MQA",
            "note": "台北大直豪宅新案規劃，欲帶客戶親自試聽整套發燒系統",
            "createdAt": "2026-09-03 15:20:10"
        },
        {
            "id": "SRV-2026-4412",
            "type": "到府聲學勘測 (Acoustic Survey)",
            "name": "張雅婷 總經理",
            "phone": "0919-456-789",
            "email": "yating.chang@techcorp.com",
            "area": "18 坪",
            "stage": "新成屋毛胚 (水電進場前)",
            "address": "新竹市東區關新路 88 號 15F",
            "budget": "150萬 - 200萬",
            "note": "客廳挑高 3.6 米，希望前期預埋發燒專線與聲學擴散板結構",
            "createdAt": "2026-09-02 11:45:00"
        },
        {
            "id": "WAR-2026-3390",
            "type": "產品保固登錄 (Warranty Registration)",
            "name": "陳志遠 醫師",
            "phone": "0933-888-999",
            "email": "dr.chen@hospital.tw",
            "serial": "ANS-PA-2024-8891",
            "model": "ProAc Response D20R (黑檀木限量版)",
            "dealer": "巴洛克官方旗艦店",
            "purchaseDate": "2024-11-20",
            "invoiceNumber": "TK-88912345",
            "createdAt": "2026-08-30 18:10:22"
        }
    ]
    with open(LEADS_FILE, "w", encoding="utf-8") as f:
        json.dump(initial_leads, f, ensure_ascii=False, indent=2)

class AnsbachPortalHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        
        # 取得所有 CRM 名單
        if parsed.path == "/api/leads":
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            try:
                with open(LEADS_FILE, "r", encoding="utf-8") as f:
                    data = f.read()
                self.wfile.write(data.encode("utf-8"))
            except Exception as e:
                self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))
            return

        # 匯出 CSV 端點
        if parsed.path == "/api/export-csv":
            self.send_response(200)
            self.send_header("Content-Type", "text/csv; charset=utf-8")
            self.send_header("Content-Disposition", "attachment; filename=\"ansbach_crm_leads.csv\"")
            self.end_headers()
            try:
                with open(LEADS_FILE, "r", encoding="utf-8") as f:
                    leads = json.load(f)
                
                # UTF-8 BOM 支援 Excel
                csv_out = "\uFEFF編號,類型,姓名,電話,電子信箱,日期/坪數,指定器材/型號/序號,備註說明,建立時間\n"
                for l in leads:
                    row = [
                        f'"{l.get("id", "")}"',
                        f'"{l.get("type", "")}"',
                        f'"{l.get("name", "")}"',
                        f'"{l.get("phone", "")}"',
                        f'"{l.get("email", "")}"',
                        f'"{l.get("date", l.get("area", ""))}"',
                        f'"{l.get("preferredEquipment", l.get("model", l.get("serial", "")))}"',
                        f'"{l.get("note", l.get("dealer", ""))}"',
                        f'"{l.get("createdAt", "")}"'
                    ]
                    csv_out += ",".join(row) + "\n"
                self.wfile.write(csv_out.encode("utf-8"))
            except Exception as e:
                self.wfile.write(f"Error: {e}".encode("utf-8"))
            return

        # 健康檢查
        if parsed.path == "/api/health":
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            resp = {
                "status": "ok",
                "server": "Ansbach Audio Flagship Portal",
                "version": "2.0.0",
                "port": PORT
            }
            self.wfile.write(json.dumps(resp).encode("utf-8"))
            return

        # 其他檔案依靜態資源處理
        super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)

        # 接收新顧客留資 (試聽預約、到府丈量、保固登錄、電子報訂閱)
        if parsed.path == "/api/leads":
            content_length = int(self.headers.get("Content-Length", 0))
            post_body = self.rfile.read(content_length)
            
            try:
                lead_data = json.loads(post_body.decode("utf-8"))
                
                leads = []
                if os.path.exists(LEADS_FILE):
                    with open(LEADS_FILE, "r", encoding="utf-8") as f:
                        leads = json.load(f)
                
                leads.insert(0, lead_data)
                
                with open(LEADS_FILE, "w", encoding="utf-8") as f:
                    json.dump(leads, f, ensure_ascii=False, indent=2)

                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(json.dumps({
                    "status": "success",
                    "message": "Lead received and saved to CRM database",
                    "id": lead_data.get("id")
                }).encode("utf-8"))
            except Exception as e:
                self.send_response(400)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "error": str(e)}).encode("utf-8"))
            return

        self.send_response(404)
        self.end_headers()

def run(port=PORT):
    server_address = ("", port)
    try:
        httpd = HTTPServer(server_address, AnsbachPortalHandler)
    except OSError:
        # 若原連接埠被佔用則自動遞增
        port += 1
        server_address = ("", port)
        httpd = HTTPServer(server_address, AnsbachPortalHandler)

    url = f"http://127.0.0.1:{port}"
    print("=" * 70)
    print("  [ANSBACH ACOUSTIC] 巴洛克音響旗艦官網伺服器已啟動")
    print(f"  * 官網瀏覽網址：{url}")
    print(f"  * CRM 名單 API：{url}/api/leads")
    print(f"  * CSV 下載端點：{url}/api/export-csv")
    print("=" * 70)
    print("  按 Ctrl+C 可隨時停止伺服器")
    print("-" * 70)

    # 非靜默模式自動開啟預設瀏覽器
    if "--no-browser" not in sys.argv:
        try:
            webbrowser.open(url)
        except Exception:
            pass

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n伺服器已關閉。")

if __name__ == "__main__":
    run()
