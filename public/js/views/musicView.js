/* eslint-disable */

import { searchResults } from './../models/search';

export const clearResult = (el) => {
  el.innerHtml = '';
};

export const renderMusic = (el, music) => {
  const html = `<div class="row"> <div class="section-music__musicContainer">
  <div class="section-music__musicContainer--music">
    <div class="section-music__musicContainer--music--ImgContainer">
      <img
        src=${music.image}
        class="section-music__musicContainer--music--Img"
        alt=""
      />
    </div>
    <div class="section-music__musicContainer--music--content">
      <div>
        <h3
          class="section-music__musicContainer--music--content--name"
        >
        ${music.musicName}
        </h3>
      </div>
      <div
        class="section-music__musicContainer--music--content--player"
      >
        <audio
          class="music-player"
          controls
          controlsList="nodownload"
        >

          <source
            src=${music.trial}
            type="audio/mpeg"
          />
        </audio>
      </div>
      <div
        class="section-music__musicContainer--music--content--Buttons"
      >
        <div class="youtubeButton">
          <a href=${music.youtubeLink}>Watch Video</a>
        </div>
        <div class="buyButton" >
          <a  id="buy" data-musicId=${music._id} class="buy-button">Buy Full Audio</a>
        </div>
      </div>
    </div>
  </div>
</div></div>`;

  el.insertAdjacentHTML('afterbegin', html);
};

const vrenderMusic = (music, el) => {
  const html = `<div class="row" style="margin-bottom: 8rem;"> <div class="section-music__musicContainer">
  <div class="section-music__musicContainer--music">
    <div class="section-music__musicContainer--music--ImgContainer">
      <img
        src=${music.image}
        class="section-music__musicContainer--music--Img"
        alt=""
      />
    </div>
    <div class="section-music__musicContainer--music--content">
      <div>
        <h3
          class="section-music__musicContainer--music--content--name"
        >
        ${music.musicName}
        </h3>
      </div>
      <div
        class="section-music__musicContainer--music--content--player"
      >
        <audio
          class="music-player"
          controls
          controlsList="nodownload"
        >

          <source
            src=${music.trial}
            type="audio/mpeg"
          />
        </audio>
      </div>
      <div
        class="section-music__musicContainer--music--content--Buttons"
      >
        <div class="youtubeButton">
          <a href=${music.youtubeLink}>Watch Video</a>
        </div>
        <div class="buyButton" data-musicId=${music._id}>
          <a  id="buy"  data-musicId=${music._id} class="buy-button">Buy Full Audio</a>
        </div>
      </div>
    </div>
  </div>
</div></div>

`;

  el.insertAdjacentHTML('afterbegin', html);
};

export const search = async (searchContent, searchResultBlock) => {
  let searched = searchContent.value;

  if (searched.startsWith(' ') || searched) {
    searched = searched.trim().toLowerCase();
  }

  searchResultBlock.innerHTML = '';

  if (searched.length >= 1) {
    try {
      const res = await searchResults(searched);

      searchResultBlock.innerHTML = '';
      if (res.data.data.doc.length !== 0) {
        res.data.data.doc.forEach((Mus) => {
          vrenderMusic(Mus, searchResultBlock);
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
};
