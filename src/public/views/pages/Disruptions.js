import Utils from './../../services/Utils.js';

const renderDisruptions = (currentDisruptions) => {
    if (currentDisruptions && currentDisruptions.length) {
      return currentDisruptions.map((dis, index) => {
        return `               
            <div class="card box-shadow mb-5" style="min-width: 16rem;">
              <div class="card-header">
                <h4>${Utils.titleCase(dis.classification)}</h4>
              </div>
              <div class="card-body text-secondary">
                <strong class="card-title">
                  ${dis.title}  
                </strong>
                <p class="card-text">
                  ${dis.times_description}
                </p>
                <a href="/disruption/${dis.id}" class="card-link">
                  See full details
                </a>                  
              </div>
            </div>              
        `;
      }).join('\n ')
    }
    
};

let lines = [];

let Disruption = {
  render: async () => {
    lines = await Utils.getLines();
    const keys = Object.keys(lines);

    const currentDisruptions = lines[keys[0]].planned_works_list;

    return /*html*/ `
      <div class="col-lg-12">
        <div class="card-body">
          <h4 class="card-title">Current disruptions</h4>
          <p class="card-text">
            Make sure you check the current disruptions regularly.
            This will help you stay on top of your planning and gets you anywhere
            within wonderland.
          </p>
          <hr/>
          <div class="row col-lg-3">
            <div class="form-group">
              <label for="lines">Select your line</label>
              <select class="form-control color-options" id="lines">
              ${
                keys &&
                keys
                  .map((line) => {
                    if (lines[line].line_name) {
                      return `
                        <option class="${lines[line].colour}" value="${line}">
                          ${lines[line].line_name}
                        </option>`;
                    }
                  })
                  .join('\n ')
              }
              </select>
            </div>
          </div>
          <div class="card-deck" id="disruptions">
            ${renderDisruptions(currentDisruptions)}
          </div>          
        </div>
      </div>      
    `;
  },
  after_render: async () => {
    $('#lines').on('change', (event) => {
      const lineId = event.currentTarget.value;
      let disruptions = lines[lineId].planned_works_list;
      $('#disruptions').html(renderDisruptions(disruptions))
    });
  },
};

export default Disruption;
