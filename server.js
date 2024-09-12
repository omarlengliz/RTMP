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
  
};

const nms = new NodeMediaServer(config);
nms.run();
