"""
巴洛克音響 (ANSBACH ACOUSTIC)
Hero Banner 靜態 Poster 擷取工具 (Offline Poster Extractor)
可由桌機版 16:9 與手機版 9:16 原影片擷取高解析度第 1 秒影格。
用法: python scripts/extract_poster.py
"""

import os
import sys

def extract_single(video_filename, output_filename, desc):
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    video_path = os.path.join(root_dir, 'assets', 'videos', video_filename)
    output_path = os.path.join(root_dir, 'assets', 'images', output_filename)

    if not os.path.exists(video_path):
        print(f"[錯誤] 找不到原影片: {video_path}")
        return False

    print(f"[*] 讀取 {desc} 原影片: {video_path}")

    # 方法 1: OpenCV
    try:
        import cv2
        cap = cv2.VideoCapture(video_path)
        fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
        cap.set(cv2.CAP_PROP_POS_FRAMES, int(fps * 0.8))
        success, frame = cap.read()
        if success:
            cv2.imwrite(output_path, frame, [cv2.IMWRITE_JPEG_QUALITY, 92])
            cap.release()
            print(f"[成功] 已透過 OpenCV 擷取 {desc} Poster: {output_path}")
            return True
        cap.release()
    except ImportError:
        pass

    # 方法 2: ffmpeg
    import subprocess
    try:
        cmd = [
            'ffmpeg', '-y', '-ss', '00:00:01.000', '-i', video_path,
            '-vframes', '1', '-q:v', '2', output_path
        ]
        res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if res.returncode == 0 and os.path.exists(output_path):
            print(f"[成功] 已透過 ffmpeg 擷取 {desc} Poster: {output_path}")
            return True
    except Exception:
        pass

    print(f"[提示] 前端已內建 HTML5 Canvas 自動即時擷取機制，無需手動執行。")
    return False

def main():
    print("=== 巴洛克音響 Banner Poster 擷取工具 ===")
    extract_single('巴洛克banner_桌機版.mp4', 'hero-poster-desktop.jpg', '桌機版 16:9')
    extract_single('巴洛克banner_手機版.mp4', 'hero-poster-mobile.jpg', '手機版 9:16')

if __name__ == '__main__':
    main()
