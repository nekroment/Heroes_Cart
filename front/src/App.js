import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getHeroThunkCreator, changeHeroThunkCreator, deleteHeroThunkCreator, setFormData, saveHeroThunkCreator, limitHeroesThunkCreator, getCountThunkCreator } from './redux/reducer/heroReducer';
import HeroManager from './components/HeroManager';
import Pagination from './components/Pagination/Pagination.jsx';

function App(props) {

  const [currentPage, setCurrentPage] = useState(1);
  const [heroPerPage, setHeroPerPage] = useState(5);

  const skip = currentPage * heroPerPage - heroPerPage;
  console.log(props.heroes)
  useEffect(() => { return props.limitHeroes(skip, heroPerPage) }, []);
  useEffect(() => { return props.getCount() }, []);
  useEffect(() => { return getLimitHeroes(skip, heroPerPage) }, [currentPage]);

  const changeCurrentPage = (number) => {
    setCurrentPage((currentPage) => { return number });
  }

  const getLimitHeroes = () => {
    props.limitHeroes(skip, heroPerPage);
  }

  let pageNumbers = props.count % heroPerPage;
  if (pageNumbers !== 0) {
    pageNumbers = (props.count - pageNumbers) / heroPerPage + 1;
  } else {
    pageNumbers = props.count / heroPerPage;
  }

  return (
    <div className="container">
      <div className="row">
        <div className={"col-lg-5 col-md-10 col-sm-10 col-xs-10 offset-lg-5 offset-md-3 offset-xs-1 offset-sm-1"}>
          <Pagination currentPage={currentPage} changeCurrentPage={changeCurrentPage} pageNumbers={pageNumbers} />
          <HeroManager setForm={props.setForm} heroes={props.heroes} formData={props.formData}
            changeHero={props.changeHero} deleteHero={props.deleteHero} saveHero={props.saveHero} />
        </div>
      </div>

    </div>
  );
}

const mapStateToProps = (state) => ({
  heroes: state.hero.heroes,
  formData: state.hero.formData,
  isLoading: state.hero.isLoading,
  count: state.hero.count
});

export default connect(mapStateToProps, {
  getHeroes: getHeroThunkCreator,
  changeHero: changeHeroThunkCreator,
  deleteHero: deleteHeroThunkCreator,
  setForm: setFormData,
  saveHero: saveHeroThunkCreator,
  limitHeroes: limitHeroesThunkCreator,
  getCount: getCountThunkCreator
})(App);
