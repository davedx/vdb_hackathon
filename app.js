var topLevelRenderFunction;

var store = {
  width: 10,
  height: 4,
  breadth: 10
};

let Actions = {
  changeInput: function (params) {
    store[params.key] = params.value;
    topLevelRenderFunction();
  }
};

class Input extends React.Component {
  onChange (e) {
    if (this.props.onChangeFunction) {
      const val = e.target.value;
      this.props.onChangeFunction({key: this.props.id, value: val});
    }
  }

  render () {
    let input;
    if (this.props.type === 'range') {
      input = <input type={this.props.type} id={this.props.id}
              className="form-control"
              value={this.props.value}
              readOnly={this.props.readOnly}
              onChange={(e) => this.onChange(e)}
              min={this.props.min}
              max={this.props.max}
              step="1"/>;
    } else {
      input = <input type={this.props.type} id={this.props.id}
              className="form-control"
              value={this.props.value}
              readOnly={this.props.readOnly}
              onChange={(e) => this.onChange(e)}/>;
    }

    return (
      <div className="form-group">
        <label htmlFor={this.props.id}>{this.props.label}: {this.props.value}</label>
        {input}
      </div>
    );
  }
}

function InputsSection (props) {
  const changeFunction = Actions.changeInput;
  return <div className="inputs-section">
    <div className="row">
      <div className="col-md-6">
        <h1>House</h1>
        <form>
          <Input type="range" label="Width" id="width" value={props.width} min="5" max="20" onChangeFunction={changeFunction} />
          <Input type="range" label="Height" id="height" value={props.height} min="3" max="10" onChangeFunction={changeFunction} />
          <Input type="range" label="Breadth" id="breadth" value={props.breadth} min="5" max="20" onChangeFunction={changeFunction} />
          <div>
            <strong>
              Volume: {props.width * props.height * props.breadth}
            </strong>
          </div>
        </form>
      </div>
      <div className="col-md-6">
        <House {...props} />
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
    if (!this.state) return null;

    return <div className="container">
      <InputsSection {...this.state} />
      <OutputsSection />
    </div>
  }
}

ReactDOM.render(<App />,
  document.getElementById('app')
);
