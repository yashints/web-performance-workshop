let LostFound = {
  render : async () => {
      let view =  /*html*/`
          <div class="card border-0 col-lg-12 text-content">
            <h1>Lost and found objects<h1>
            <object type="text/html" height="800" width="100%"  data="/assets/content.txt">
            <object>            
          </div>
      `
      return view
  },
  after_render: async () => {}
      
}

export default LostFound;