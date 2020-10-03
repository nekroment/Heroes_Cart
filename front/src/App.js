import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getHeroThunkCreator, changeHeroThunkCreator, deleteHeroThunkCreator } from './redux/reducer/heroReducer';
import HeroManager from './components/HeroManager';

function App(props) {

  useEffect(() => { return props.getHeroes() }, []);

  return (
    <div className="App">
      <HeroManager heroes={props.heroes} form={props.form}
        changeHero={props.changeHero} deleteHero={props.deleteHero} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  heroes: state.hero.heroes,
  form: state.hero.form,
  isLoading: state.hero.isLoading
});

export default connect(mapStateToProps, {
  getHeroes: getHeroThunkCreator,
  changeHero: changeHeroThunkCreator,
  deleteHero: deleteHeroThunkCreator
})(App);
