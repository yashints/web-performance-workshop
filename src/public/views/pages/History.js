let History = {
  render: async () => {
    let view = /*html*/ `
            <div class="card border-0 col-lg-12 text-content">
              <h1>
                A little bit about our history
              </h1>
              <video muted controls id="videoElement">
                <source src="/assets/park.mp4" type="video/mp4">
                Sorry, your browser doesn't support embedded videos.
              </video>
            </div>
        `;
    return view;
  },
  after_render: async () => {
    setTimeout(() => {
      const videoElement = document.getElementById('videoElement');
    const onVisibilityChange = () => {
      console.info('✔️ Page is visible again, playing the video!');
      console.log(document.hidden);
      if (document.hidden) {
        console.warn('⚠️ Page is not visible, stopping the video!');
        videoElement.pause();
      } else {
        console.info('✔️ Page is visible again, playing the video!');
        videoElement.play();
      }
    };
    console.info('Hooking into visibility change...');
    document.addEventListener('visibilitychange', onVisibilityChange);
    }, 2000);
    
  },
};

export default History;