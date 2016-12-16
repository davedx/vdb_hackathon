var init = false;

class House extends React.Component {
  render () {
    if (this.mesh) {
      this.mesh.scale.x = this.props.width/10;
      this.mesh.scale.y = this.props.height/4;
      this.mesh.scale.z = this.props.breadth/10;
    }
    return <div className="house-area" ref="house3d"></div>
  }

  componentDidMount () {
    if (init) {
      return;
    }
    init = true;
    //console.log('mounting three: ', this.props);

    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.z = 30;
    this.scene = new THREE.Scene();
    var texture = new THREE.TextureLoader().load( 'llama.jpg' );
    var geometry = new THREE.BoxBufferGeometry(this.props.width, this.props.height, this.props.breadth);
    var material = new THREE.MeshBasicMaterial( { map: texture } );
    this.mesh = new THREE.Mesh(geometry, material);

    this.mesh.rotation.x = 0.5;
    this.mesh.rotation.y = 0.5;

    this.scene.add(this.mesh);
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setPixelRatio( window.devicePixelRatio );
    //console.log('setting renderer size: ', this.refs.house3d.clientWidth, this.refs.house3d.clientHeight);
    this.renderer.setSize(this.refs.house3d.clientWidth, this.refs.house3d.clientHeight);
    this.renderer.setClearColor( 0xffffff, 0);

    this.refs.house3d.appendChild(this.renderer.domElement);

    //window.addEventListener('resize', this.onWindowResize.bind(this), false);

    this._animate = this.animate.bind(this);
    this._animate();
  }

  onWindowResize () {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }
  
  animate () {
    requestAnimationFrame(this._animate);
    this.renderer.render(this.scene, this.camera);
  }
}