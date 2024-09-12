const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 4096,  // Set it lower for lower latency
    gop_cache: true,
    ping: 30 } ,
  http: {
    port: 8000,
    mediaroot: './media',
    webroot: './www',
    allow_origin: '*',
  },
  trans: {
    
    ffmpeg: 'F:/programfiles/ffmpg/bin/ffmpeg.exe', // Corrected path format
    tasks: [
      {
        app: 'live',
        mp4: true,
        mp4Flags: '[movflags=frag_keyframe+empty_moov]',
        hls: true,                // Enable HLS for adaptive streaming
        hlsFlags: '[hls_time=1:hls_list_size=3:hls_flags=delete_segments]',  // Adjust HLS settings for lower latency
        dash: true,
        
        args: [
          '-preset', 'ultrafast',  // Use ultrafast preset for lower latency
          '-tune', 'zerolatency',  // Tune for real-time, low-latency streaming
          '-fflags', 'nobuffer',
          '-flags', 'low_delay',
          '-movflags', 'faststart',
          '-g', '30'               // GOP size (smaller GOP can reduce latency)
        ],
      },
    ],
  },
};

const nms = new NodeMediaServer(config);
nms.run();
