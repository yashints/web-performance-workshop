let Navbar = {
    render: async () => {
        let view =  /*html*/`
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
            <img src="/images/train.png" width="60" alt=""/>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Plan your journey
                <span class="sr-only">
                  Plan your journey
                </span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/disruptions">Disruptions</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/tickets">Tickets</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#/about">About</a>
            </li>
          </ul>         
        </div>
      </nav>
        `
        return view
    },
    after_render: async () => {
      
    }

}

export default Navbar;