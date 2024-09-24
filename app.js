class Calculatrice extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        valeurAffichee: '0',
        valeurPrecedente: null,
        operateur: null,
        enAttenteNouvelleValeur: false
      };
    }
  
    gererClicNombre = (nombre) => {
      const { valeurAffichee, enAttenteNouvelleValeur } = this.state;
  
      if (enAttenteNouvelleValeur) {
        this.setState({
          valeurAffichee: String(nombre),
          enAttenteNouvelleValeur: false
        });
      } else {
        this.setState({
          valeurAffichee: valeurAffichee === '0' ? String(nombre) : valeurAffichee + nombre
        });
      }
    };
  
    gererClicOperateur = (operateur) => {
      const { valeurAffichee, valeurPrecedente, operateur: operateurPrecedent } = this.state;
  
      if (operateur === '=') {
        if (operateurPrecedent && valeurPrecedente !== null) {
          const resultat = this.effectuerCalcul(valeurPrecedente, parseFloat(valeurAffichee), operateurPrecedent);
          this.setState({
            valeurAffichee: String(resultat),
            valeurPrecedente: null,
            operateur: null,
            enAttenteNouvelleValeur: true
          });
        }
      } else {
        if (valeurPrecedente === null) {
          this.setState({
            valeurPrecedente: parseFloat(valeurAffichee),
            operateur,
            enAttenteNouvelleValeur: true
          });
        } else if (operateurPrecedent) {
          const resultat = this.effectuerCalcul(valeurPrecedente, parseFloat(valeurAffichee), operateurPrecedent);
          this.setState({
            valeurAffichee: String(resultat),
            valeurPrecedente: resultat,
            operateur,
            enAttenteNouvelleValeur: true
          });
        }
      }
    };
  
    effectuerCalcul = (valeurPrecedente, nouvelleValeur, operateur) => {
      switch (operateur) {
        case '+':
          return valeurPrecedente + nouvelleValeur;
        case '-':
          return valeurPrecedente - nouvelleValeur;
        case '*':
          return valeurPrecedente * nouvelleValeur;
        case '/':
          return valeurPrecedente / nouvelleValeur;
        default:
          return nouvelleValeur;
      }
    };
  
    gererReinitialisation = () => {
      this.setState({
        valeurAffichee: '0',
        valeurPrecedente: null,
        operateur: null,
        enAttenteNouvelleValeur: false
      });
    };
  
    render() {
      return (
        <div className="calculatrice mx-auto mt-5 p-4 border border-3 border-primary w-100">
          <div className="affichage bg-white border border-3 border-primary text-dark p-2 text-right fs-2">
            {this.state.valeurAffichee}
          </div>
          <div className="row">
            <button className="col btn btn-primary mt-2 mb-2" onClick={this.gererReinitialisation}>C</button>
          </div>
          <div className="row mb-2 gap-2">
            <button className="col btn btn-info" onClick={() => this.gererClicNombre(1)}>1</button>
            <button className="col btn btn-info" onClick={() => this.gererClicNombre(2)}>2</button>
            <button className="col btn btn-info" onClick={() => this.gererClicNombre(3)}>3</button>
            <button className="col btn btn-secondary" onClick={() => this.gererClicOperateur('+')}>+</button>
          </div>
          <div className="row mb-2 gap-2">
            <button className="col btn btn-info" onClick={() => this.gererClicNombre(4)}>4</button>
            <button className="col btn btn-info" onClick={() => this.gererClicNombre(5)}>5</button>
            <button className="col btn btn-info" onClick={() => this.gererClicNombre(6)}>6</button>
            <button className="col btn btn-secondary" onClick={() => this.gererClicOperateur('-')}>-</button>
          </div>
          <div className="row mb-2 gap-2">
            <button className="col btn btn-info" onClick={() => this.gererClicNombre(7)}>7</button>
            <button className="col btn btn-info" onClick={() => this.gererClicNombre(8)}>8</button>
            <button className="col btn btn-info" onClick={() => this.gererClicNombre(9)}>9</button>
            <button className="col btn btn-secondary" onClick={() => this.gererClicOperateur('*')}>*</button>
          </div>
          <div className="row mb-2 gap-2">
            <button className="col btn btn-info" onClick={() => this.gererClicNombre(0)}>0</button>
            <button className="col btn btn-secondary" onClick={() => this.gererClicOperateur('/')}>/</button>
            <button className="col btn btn-success" onClick={() => this.gererClicOperateur('=')}>=</button>
          </div>
        </div>
      );
    }
  }
  
  const root = ReactDOM.createRoot(document.getElementById('app'));
  root.render(<Calculatrice />);
  
