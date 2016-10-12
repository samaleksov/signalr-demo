// polyfill webpack require.ensure


import App from '../containers/App';
//import Counter from "../components/Counter";

if (typeof System === 'undefined') {
	var System = {
		import: (m) => {
			return new Promise((resolve,reject)=> {
				resolve(require(m));
			})
		}
	}
}

function errorLoading(err) {
  console.error('Dynamic page loading failed', err);
}

function loadRoute(cb) {
  return (module) => cb(null, module.default);
}

export default {
  component: App,
  childRoutes: [
		{
			path: '/',
			getComponent(location, cb) {
			 //cb(null, Counter)
       System.import( "../components/Main").then(loadRoute(cb)).catch(errorLoading);
      }
	 },
	 {
		 path: '/counter1',
		 getComponent(location, cb) {
			//cb(null, Counter)
		 	System.import( "../components/Counter").then(loadRoute(cb)).catch(errorLoading);
		 }
	 },
	 {
		 path: '/counter2',
		 getComponent(location, cb) {
			//cb(null, Counter)
		 	System.import( "../components/Counter2").then(loadRoute(cb)).catch(errorLoading);
		 }
	 }
	]
};
