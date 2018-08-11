import {$, $$, render, safe} from 'dat://pauls-uikit.hashbase.io/js/dom.js'
import {clone} from './util.js'

//add photo
function onClickAddPhoto (e) {
  console.log('you clciked')
  e.preventDefault();
  var self = new DatArchive(window.location);
  if (e.target.files) {
    const {files} = e.target

    for (let i = 0; i < files.length; i += 1) {
      const reader = new FileReader()
      const file = files[i]

      reader.onload = async function () {
        const path = `/photos/${file.name}`
        await self.writeFile(path, reader.result)
      }
      reader.readAsArrayBuffer(file)
    }
  }
}

async function renderThis () {
  var photosContainer = $('#photos-container');
  photosContainer.innerHTML = '';
  var self = new DatArchive(window.location);

  // get info about site 
  var info = await self.getInfo()
  // if you own the site, then you can load an image
  // if (info.isOwner) {
  //   $('#photos-container').classList.remove('hide');
  // }

  //add empty tiles to mosaic
  var numTiles = 10;
  for (var i = numTiles - 1; i >= 0; i--) {
    let el = clone($('#tile-template'))
    let url = self.url + '/empty.png'
    $(el,'.image').setAttribute('src', `${safe(url)}`)
    $('#photos-container').appendChild(el)
  }

  // render loaded photos   
  var photoNames = await self.readdir('/photos');
  photoNames.forEach(name => {
    let url = self.url + '/photos/' + name
    photosContainer.append(render(`<img src="${safe(url)}"></img>`))
  });
}


async function OnPageLoad () {
  $('#add-photo-btn').addEventListener('click', onClickAddPhoto);
  renderThis()
}

OnPageLoad()

