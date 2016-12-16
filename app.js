var topLevelRenderFunction;

var store = {
  width: 10,
  height: 4,
  breadth: 10,
  doubleGlazing: "true"
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
    let label;
    if (this.props.type === 'range') {
      label = <label htmlFor={this.props.id}>{this.props.label}: {this.props.value}</label>;
      input = <input type={this.props.type} id={this.props.id}
              value={this.props.value}
              readOnly={this.props.readOnly}
              onChange={(e) => this.onChange(e)}
              min={this.props.min}
              max={this.props.max}
              step="1"/>;
    } else if (this.props.type === 'radio') {
      label = <label htmlFor={this.props.id}>{this.props.label}&nbsp;</label>;
      input = <input type={this.props.type} id={this.props.id}
              value={this.props.value}
              checked={store[this.props.id] === this.props.value}
              onChange={(e) => this.onChange(e)}
              name={this.props.name} />;
    } else {
      label = <label htmlFor={this.props.id}>{this.props.label}: {this.props.value}</label>;
      input = <input type={this.props.type} id={this.props.id}
              className="form-control"
              value={this.props.value}
              readOnly={this.props.readOnly}
              onChange={(e) => this.onChange(e)}/>;
    }

    return (
      <div className="form-group">
        {label}
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
          <Input type="range" label="Width" id="width" value={props.width} min="1" max="100" onChangeFunction={changeFunction} />
          <Input type="range" label="Heigth" id="height" value={props.height} min="2" max="10" onChangeFunction={changeFunction} />
          <Input type="range" label="Breadth" id="breadth" value={props.breadth} min="1" max="100" onChangeFunction={changeFunction} />
          <div className="form-group">
            <strong>
              Volume: {props.width * props.height * props.breadth}
            </strong>
          </div>
          <div>
            <strong>
              Double glazing:
            </strong>
            <div className="row">
              <div className="col-xs-6">
                <Input type="radio" label="Yes" id="doubleGlazing" name="doubleGlazing" value="true" onChangeFunction={changeFunction} />
              </div>
              <div className="col-xs-6">
                <Input type="radio" label="No" id="doubleGlazing" name="doubleGlazing" value="false" onChangeFunction={changeFunction} />
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="col-md-6">
        <House />
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
