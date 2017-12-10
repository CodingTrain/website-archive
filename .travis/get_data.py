import urllib3.request, urllib.request
import requests as req
import os
import json
import simplejson



def update_readme():
    videos = get_videos()
    make_readme(videos[::-1])

def make_readme(videos):
    readme = open('README.md','r+')
    lines = readme.readlines()
    target_index = lines.index('# Past Live Streams\n')
    lines = lines[:target_index + 1]
    for video in videos:
        stream_link = '* [' + video['title'] + '](https://youtu.be/' + video['video_id'] + '?list=' + os.environ.get('playlistID') + ')\n'
        lines.append(stream_link)
    print(''.join(lines) ,file=open('README.md','w'))
def get_videos(pageToken=''):
    YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/playlistItems?maxResults=50&pageToken=%s&part=snippet&playlistId=%s&key=' + os.environ.get('YOUTUBE_API_KEY')
    response = req.get(YOUTUBE_API_URL % (pageToken,os.environ.get('playlistID')))
    jsdata = simplejson.loads(response.text)
    videos = []
    for video in jsdata['items']:
        videoData = {}
        videoData['video_id'] = video['snippet']['resourceId']['videoId']
        videoData['title'] = video['snippet']['title']
        videos.append(videoData)

    if 'nextPageToken' in jsdata.keys():
        nextPageToken = jsdata['nextPageToken']
        videos.extend(get_videos(nextPageToken))
    return videos

update_readme()
