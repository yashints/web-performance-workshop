let About = {
    render : async () => {
        let view =  /*html*/`
            <div class="card border-0 col-lg-12 about">
              <div class="card-img-crop">
                <img class="card-img-top" src="/images/about.jpg" alt="Wonderland">
              </div>              
              <div class="card-body">                
                <h4 class="card-title"> About </h4>
                <p class="card-text">
                  Wonderland Sydney (originally known as Australia's Wonderland), 
                  was an amusement park in Eastern Creek, Sydney, New South Wales, 
                  Australia. Officially opened in December 1985 by the Premier of New South 
                  Wales, Neville Wran, the park was the largest in the southern hemisphere. 
                  It remained open for over 18 years and was the premier theme park in 
                  New South Wales for much of its life until its closure in 2004.
                </p>
                <p class="card-text">
                  For many years, Wonderland's flagship ride was 'The Bush Beast' 
                  which was the largest wooden roller coaster in Australia. 
                  Australia's Wonderland also claimed that it was the largest wooden 
                  rollercoaster in the Southern Hemisphere. 'The Beastie', a smaller 
                  version of The Bush Beast which catered to younger riders, was also 
                  one of the original rides. The park would later add rides such as the 
                  'Demon' (1992) and 'Space Probe 7' (1995; sponsored by the 
                    Seven Network, who bought naming rights to the ride. After 
                    this contract expired, the ride dropped the '7' from its name).
                </p>
                <p class="card-text">
                  Australia's Wonderland expanded, and rebranded as Wonderland Sydney 
                  it featured an all-new water park known as 'The Beach', which 
                  first opened in 1988. Unlike the rest of the park, which remained 
                  open year-round, The Beach was a seasonal attraction which closed 
                  during the winter months (June–September). In 1990 Wonderland opened 
                  the 'Australian Wildlife Park'. Another attraction named 
                  'The Outback Woolshed' was added in 1995, along with an 
                  à-la-carte-style restaurant.
                </p>
              </div>                
            </section>
        `
        return view
    },
    after_render: async () => {}
        
}

export default About;