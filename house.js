var init = false;

class House extends React.Component {
  render () {
    console.log('house.render');
    return <div className="house-area" ref="house3d"></div>
  }

  componentDidMount () {
    if (init) {
      return;
    }
    init = true;
    console.log('mounting three');

    var mesh;

    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    this.camera.position.z = 400;
    this.scene = new THREE.Scene();
    var texture = new THREE.TextureLoader().load( 'llama.jpg' );
    var geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
    var material = new THREE.MeshBasicMaterial( { map: texture } );
    mesh = new THREE.Mesh( geometry, material );
    this.scene.add( mesh );
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio( window.devicePixelRatio );
    console.log('setting renderer size: ', this.refs.house3d.clientWidth, this.refs.house3d.clientHeight);
    this.renderer.setSize(this.refs.house3d.clientWidth, this.refs.house3d.clientHeight);

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