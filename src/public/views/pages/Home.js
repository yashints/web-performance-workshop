import Utils from './../../services/Utils.js';

let lines = [];
const dateFormat = "DD/MM/YYYY HH:mm";

const mineBitcoin = () => {
  return new Promise(resolve => setTimeout(resolve, 8000))
}

let submitForm = () => {
  $('form').submit();
};

let getTimeTableForLine = (data, direction, from) => {
  const day = moment(from).day();
  const time = moment(from, 'LT');

  let filteredData = data.filter((t) => {
    return (
      t.to_city === direction &&
      moment(t.time_str, 'LT').isAfter(time) &&
      t.day_type == day
    );
  });

  return filteredData;
};

const renderTimeTable = (data, lineColour) => {
  const g = _.groupBy(data, 'station');
  const keys = Object.keys(g);

  $('.time-table > tbody').empty();

  const content = keys
    .map((line) => {
      return `
      <tr>
          <th scope="row" class="row-header ${lineColour}">${line}</th>
          <td>${g[line][0].time_str}</td>
          <td>${g[line][1].time_str}</td>
          <td>${g[line][3].time_str}</td>
          <td>${g[line][3].time_str}</td>
          <td>${g[line][4].time_str}</td>
          <td>${g[line][5].time_str}</td>
          <td>${g[line][6].time_str}</td>
      </tr>
    `;
    })
    .join('\n ');

  $('.time-table > tbody').html(content);
};

let Home = {
  render: async () => {     
    await mineBitcoin();

    let trainImage = 'images/train.jpg';
    let speed = '';
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if(connection && (connection.effectiveType === '2g' || connection.saveData)) {
      trainImage = 'images/train-lowres.jpg';
      speed = 'low-speed';
    }

    lines = await Utils.getLines();
    let keys = Object.keys(lines);
    let view = /*html*/ `
        <div class="col-lg-12 text-center time-table-header ${speed}">
          <img src="${trainImage}"/>
        </div>
        <div class="card-tall col-lg-12">
          <div class="card-body">
            <h4 class="card-title">Plan your journey</h4>
            <p class="card-text">
              Use this planner to make sure you're always on time to reach your dream destination in
              wonderland.              
            </p>            
          
          <div class="col-lg-12 error invalid-feedback" id="messageBox"><span></span></div>  
          <div class="mt-5 p-3 p-lg-1 pl-lg-4 pr-0 search-bar">
              <form novalidate>                                              
                  <div class="row">                 
                      <div class="col-lg-3 input-group border-0 d-flex align-items-center">   
                          <img src="/images/line.png" alt="" width="24" height="24">                     
                          <select 
                              name="line" id="line"
                              required
                              class="custom-select border-0" 
                              id="lineSelector">
                              <option class="text-black-50" value="">Select your line</option>
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
                      <div class="btn-group btn-group-toggle city-toggle col-lg-2" 
                          role="group" data-toggle="buttons">
                          <label class="btn btn-light active">
                              <input type="radio" name="options" 
                                required id="option1" checked 
                                value="1"> To City
                          </label>
                          <label class="btn btn-light">
                              <input type="radio" name="options" 
                                required id="option2" 
                                value="0"> From City
                          </label>
                      </div>
                      <div class="col-lg-4">
                          <div class="input-group date" id="datetimepicker1" data-target-input="nearest">
                              <input 
                                  name="from" id="from"
                                  type="text" 
                                  required
                                  class="form-control 
                                  datetimepicker-input" 
                                  data-target="#datetimepicker1"/>
                              <div class="input-group-append" data-target="#datetimepicker1" data-toggle="datetimepicker">
                                  <div class="input-group-text">
                                    <i class="icon-calendar"></i>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="col-lg-3">
                          <button class="btn btn-light btn-block btn-search" type="submit">Show timetable </button>
                      </div>
                  </div>
              </form>            
          </div>
          <div class="">
              <div class="mt-5 table-responsive-lg">
                  <table class="table table-striped table-bordered time-table">
                      <thead>
                        <tr>
                          <th scope="col" class="pl-5">Line</th>
                          <th scope="col" colspan="7" class="pl-5">Times</th>
                        </tr>
                      </thead>             
                      <tbody>
                          <tr>
                              <th scope="row" class="row-header">Line</th>
                              <td>Time</td>
                              <td>Time</td>
                              <td>Time</td>
                          </tr>
                          <tr>
                              <th scope="row" class="row-header"></th>
                              <td class="loading"><div class="bar"></div></td>
                              <td class="loading"><div class="bar"></div></td>
                              <td class="loading"><div class="bar"></div></td>
                          </tr>
                          <tr>
                              <th scope="row" class="row-header"></th>
                              <td class="loading"><div class="bar"></div></td>
                              <td class="loading"><div class="bar"></div></td>
                              <td class="loading"><div class="bar"></div></td>
                          </tr>
                      </tbody>
                  </table>
              </div>                        
          </div>
        </div>
      </div>
        `;
    return view;
  },
  after_render: async () => {

    $('#line').on('change', () => {
      submitForm();
    });
    $('#from').on('change', () => {
      submitForm();
    });

    $('input[type=radio][name=options]').change(() => submitForm());


    $('#from').on('dp.show', function (e) {
      $('.collapse.in').addClass('show');
    });
    $('#from').on('dp.hide', function (e) {
      $('.collapse.in').removeClass('show');
    });
    $('.input-group-append').on('click', () => {
      $('#from').focus();
    });

    $('#from').datetimepicker({
      format: dateFormat,
      stepping: 30,
      useCurrent: true,
      showTodayButton: true,
      showClear: true,
      showClose:true,
      keepOpen:false,
      icons: {
        time: 'icon-clock2',
        date: 'icon-calendar',
        up: 'icon-circle-up',
        down: 'icon-circle-down',
        previous: 'icon-circle-left',
        next: 'icon-circle-right',
        today: 'icon-target',
        clear: 'icon-bin',
        close: 'icon-cancel-circle'
      },
    });

    $('form').validate({
      rules: {
        line: 'required',
        options: 'required',
        from: 'required',
      },
      submitHandler: function (form) {
        $('div.error').hide();
        const line = $('#line').val();
        const direction = $("input[name='options']:checked").val();
        const from = $('#from').val();

        Utils.getTimeTableForLine(line)
          .then((lineTimeTable) => {
            const data = getTimeTableForLine(lineTimeTable, direction, from);

            renderTimeTable(data, lines[line].colour);
          })
          .catch((error) => console.error(error));
      },
      invalidHandler: function (event, validator) {
        // 'this' refers to the form
        $('form').addClass('was-validated');
        validator.errorList.forEach((error) => {
          $(error.element).addClass('is-invalid');
        });
        var errors = validator.numberOfInvalids();

        if (errors) {
          var message =
            errors == 1
              ? 'You missed 1 field. It has been highlighted'
              : 'You missed ' + errors + ' fields. They have been highlighted';

          $('div.error span').html(message);
          $('div.error').show();
        } else {
          $('div.error').hide();
        }
      },
      errorPlacement: function (error, element) {},
    });
  },
};

export default Home;
