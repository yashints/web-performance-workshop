import { default as showADog } from '../../js/random-dog';

let Surprise = {
  render: async () => {
    let view = /*html*/ `
            <div class="card border-0 col-lg-12 surprise-container">
              <h1>
                We have a little surprise for you!
              </h1>
              
              <div class="col-md-2">
                <button id="surpriseBtn" type="button" class="btn btn-info">
                  <span>Surprise me 😯</span>
                </button>
              <div>

              <div id="surprise" class="col-md-12 p-0 surprise">
              </div>
            </div>
        `;
    return view;
  },
  after_render: async () => {
    const surpriseBtn = document.getElementById('surpriseBtn');
    const surprise = document.getElementById('surprise');
    surpriseBtn.addEventListener('click', function() {      
      showADog(surprise, window);
    });
  },
};

export default Surprise;
