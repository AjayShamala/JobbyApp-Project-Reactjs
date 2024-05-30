import {Route, Switch} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import AboutJobItem from './components/AboutJobItem'
import AllJobs from './components/AllJobs'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

import './App.css'
// These are the lists used in the application. You can move them to any component needed.

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs/:id" component={AboutJobItem} />
    <ProtectedRoute exact path="/jobs" component={AllJobs} />
    <Route component={NotFound}/>
  </Switch>
)
export default App
