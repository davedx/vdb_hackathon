var topLevelRenderFunction;

let Actions = {
  changeMyPageSliderVal: function (e) {
    var val = 35;
    console.log('val changed! ', val);
    store.MyPage.sliderValue = val;
    topLevelRenderFunction();
  }
}

var store = {
  MyPage: {
    sliderValue: 30
  }
};


function InputsSection (props) {
  return <div className="inputs-section">
    <div className="row">
      <div className="col-md-6">
        <h1>House</h1>

        <House />
      </div>
      <div className="col-md-6">
        <h1>Three.js here</h1>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12">
        <h1>Last inputs here...</h1>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12">
        <button className="btn btn-block">Calculate!!!!</button>
      </div>
    </div>
  </div>
}

function OutputsSection (props) {
  return <div className="outputs-section">
    <div className="row">
      <div className="col-md-12">
        <h1>Results</h1>

        ...results here...
      </div>
    </div>
  </div>
}

class App extends React.Component {
  componentDidMount () {
    topLevelRenderFunction = this.setStateFromStore.bind(this);
    topLevelRenderFunction();
  }

  setStateFromStore () {
    this.setState(store);
  }

  render () {
    console.log('render!');
    if (!this.state) return null;

    return <div>
      <InputsSection />
      <OutputsSection />
    </div>
  }
}

ReactDOM.render(<App />,
  document.getElementById('app')
);
