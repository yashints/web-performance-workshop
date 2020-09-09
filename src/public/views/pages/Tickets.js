import Utils        from '../../services/Utils.js'

let Tickets = {

    render : async () => {
        return /*html*/`
        <div class="col-lg-12 text-center">
          <h4>Enjoy wonderland with one of these packages</h4>
        </div>
        <section class="pricing py-5">
          <div class="container">
            <div class="row">
              <div class="col-lg-4">
                <div class="card mb-5 mb-lg-0">
                  <img class="card-img-top" src="/images/1.jpg" alt="Wonderland">
                  <div class="card-body">
                    <h5 class="card-title text-muted text-uppercase text-center">Basic</h5>
                    <h6 class="card-price text-center">$150<span class="period">/pp</span></h6>
                    <hr>
                    <ul class="fa-ul">
                      <li><span class="fa-li"><i class="fas fa-check"></i></span>
                        One per family
                      </li>
                      <li><span class="fa-li"><i class="fas fa-check"></i></span>
                        1 day pass
                      </li>
                      <li><span class="fa-li"><i class="fas fa-check"></i></span>
                        Unlimited entry
                      </li>
                      <li><span class="fa-li"><i class="fas fa-check"></i></span>
                        Wet'n'Wild entry
                      </li>
                      <li class="text-muted"><span class="fa-li"><i class="fas fa-times"></i></span>
                        Sea World entry
                      </li>
                      <li class="text-muted"><span class="fa-li"><i class="fas fa-times"></i></span>
                        Access to VIP shows
                      </li>
                      <li class="text-muted"><span class="fa-li"><i class="fas fa-times"></i></span>
                        24/7 Bar access
                      </li>
                      <li class="text-muted"><span class="fa-li"><i class="fas fa-times"></i></span>
                        Complimentary dinner for <strong>four</strong>
                      </li>
                    </ul>
                    <a href="#" class="btn btn-block btn-primary text-uppercase">Buy</a>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="card mb-5 mb-lg-0">
                  <img class="card-img-top" src="/images/2.jpg" alt="Amazing">
                  <div class="card-body">
                    <h5 class="card-title text-muted text-uppercase text-center">VIP</h5>
                    <h6 class="card-price text-center">$250<span class="period">/pp</span></h6>
                    <hr>
                    <ul class="fa-ul">
                      <li><span class="fa-li"><i class="fas fa-check"></i></span>
                        Two per family
                      </li>
                      <li><span class="fa-li"><i class="fas fa-check"></i></span>
                        2 day pass
                      </li>
                      <li><span class="fa-li"><i class="fas fa-check"></i></span>
                        Unlimited entry
                      </li>
                      <li><span class="fa-li"><i class="fas fa-check"></i></span>
                        Wet'n'Wild entry
                      </li>
                      <li><span class="fa-li"><i class="fas fa-check"></i></span>
                        Sea World entry
                      </li>
                      <li><span class="fa-li"><i class="fas fa-check"></i></span>
                        Access to VIP shows
                      </li>
                      <li class="text-muted"><span class="fa-li"><i class="fas fa-times"></i></span>
                        24/7 Bar access
                      </li>
                      <li class="text-muted"><span class="fa-li"><i class="fas fa-times"></i></span>
                        Complimentary dinner for <strong>four</strong>
                      </li>
                    </ul>
                    <a href="#" class="btn btn-block btn-primary text-uppercase">Buy</a>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="card">
                  <img class="card-img-top" src="/images/3.jpg" alt="Sea World">
                  <div class="card-body">
                    <h5 class="card-title text-muted text-uppercase text-center">Ultimate</h5>
                    <h6 class="card-price text-center">$650<span class="period">/pp</span></h6>
                    <hr>
                    <ul class="fa-ul">
                      <li>
                        <span class="fa-li">
                          <i class="fas fa-check"></i>
                        </span>
                        Three per family
                      </li>
                      <li><span class="fa-li"><i class="fas fa-check"></i></span>
                        3 day pass
                      </li>
                      <li><span class="fa-li"><i class="fas fa-check"></i></span>
                        Unlimited entry
                      </li>
                      <li><span class="fa-li"><i class="fas fa-check"></i></span>
                        Wet'n'Wild entry
                      </li>
                      <li><span class="fa-li"><i class="fas fa-check"></i></span>
                        Sea World entry
                      </li>
                      <li><span class="fa-li"><i class="fas fa-check"></i></span>
                        Access to VIP shows
                      </li>
                      <li><span class="fa-li"><i class="fas fa-check"></i></span>
                        24/7 Bar access
                      </li>
                      <li><span class="fa-li"><i class="fas fa-check"></i></span>
                        Complimentary dinner for <strong>four</strong>
                      </li>
                    </ul>
                    <a href="#" class="btn btn-block btn-primary text-uppercase">Buy</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        `
    }
    , after_render: async () => {
    }
}

export default Tickets;