import * as three from '../lib/three.js-r84/build/three.min.js';

export default function (textures) {
  const loader = new three.TextureLoader();
  const loadedTextures = {};
  let i = 0;

  const promise = new Promise((resolve, reject) => {
    function onLoadDone(texture) {
      console.log("txld loaded: " + textures[i]);
      loadedTextures[textures[i]] = texture;
      i += 1;
      if (i < textures.length) {
        load_texture(textures[i], onLoadDone, onLoadFailed);
      } else {
        resolve(loadedTextures);
      }
    }
  
    function onLoadFailed(xhr) {
      console.log("txld load failed: " + game.textures[i]);
      reject();
    }
    
    load_texture(textures[i], onLoadDone, onLoadFailed);
  });

  this.handleLoad = function (onDone, onFail) {
    promise.then(onDone, onFail);
  };

  function load_texture(url, onDone, onError) {
    console.log("txld load: " + url);
    const progress = xhr =>
      console.log("txld: " + (xhr.loaded / xhr.total * 100) + "%");
    loader.load(url, onDone, progress, onError);
  }
}
