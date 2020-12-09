import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {FilmsPage} from "./pages/FilmsPage";
import {DetailPage} from "./pages/DetailPage";
import {AddFilmsPage} from "./pages/AddFilmPage";
import {DellFilm} from "./components/DellFilm";
import {SearchFilm} from "./components/SearchFilm";
import {LoadFilmPage} from "./pages/LoadFilmPage";

export const useRoutes  = () => {
        return (
            <Switch>
                <Route path='/film' exact >
                    <FilmsPage />
                </Route>
                <Route path='/film/actor/:idActor' >
                    <FilmsPage />
                </Route>
                <Route path='/film/actorname/:nameActor' >
                    <FilmsPage />
                </Route>
                <Route path='/filter/:id'>
                    <FilmsPage />
                </Route>
                <Route path='/film/:name'>
                    <FilmsPage />
                </Route>
                <Route path='/newFilm' exact >
                    <AddFilmsPage />
                </Route>
                <Route path='/loadFilm' exact >
                    <LoadFilmPage />
                </Route>
                <Route path='/detail/:id' >
                    <DetailPage />
                </Route>
                <Route path='/detail/actor/:id' >
                    <DetailPage />
                </Route>
                <Route path='/delete/:id' >
                    <DellFilm />
                </Route>

                <Route path='/actors' exact>
                    <SearchFilm />
                </Route>

                <Redirect to ='/film'/>
            </Switch>
        )

}
