import App from '../containers/App';

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
  return (module) => {
		cb(null, module.default);
	}
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
		 path: '/counter',
		 getComponent(location, cb) {
			//cb(null, Counter)
		 	System.import( "../components/Counter").then(loadRoute(cb)).catch(errorLoading);
		 }
	 },
	 {
		 path: '/stock-tickers',
		 getComponent(location, cb) {
			//cb(null, Counter)
		 	System.import( "../components/StockTickers").then(loadRoute(cb)).catch(errorLoading);
		 }
	 },
	 {
		 path: '/about-signalr',
		 getComponent(location, cb) {
			//cb(null, Counter)
		 	System.import( "../components/About").then(loadRoute(cb)).catch(errorLoading);
		 }
	 },
	 {
		 path: '/slides',
		 getComponent(location, cb) {
			//cb(null, Counter)
		 	System.import( "../components/Slides").then(loadRoute(cb)).catch(errorLoading);
		 }
	 }
	]
};
