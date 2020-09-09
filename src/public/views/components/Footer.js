let Footer = {
    render: async () => {
        let view =  /*html*/`
        <div class="container-fluid p-3 p-md-5">
            <ul class="bd-footer-links">
                <li><a href="#">Wonderland</a></li>
                <li><a href="#">Reviews</a></li>
                <li><a href="tickets">Tickets</a></li>
                <li><a href="#">About</a></li>
            </ul>
            <p>Designed and built with all the love in wonderland by 
            <a href="https://twitter.com/mdo" target="_blank" rel="noopener">@yashints</a>.             
            <p>All copyrights reserved to <strong>people of wonderland</strong>.</p>
        </div>
        `
        return view
    },
    after_render: async () => { }

}

export default Footer;