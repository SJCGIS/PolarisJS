if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').then(function (reg) {
    ga('send', 'event', 'ServiceWorker', 'Available', getServiceWorkerStatus())
    reg.onupdatefound = function () {
      var installingWorker = reg.installing

      installingWorker.onstatechange - function () {
        switch (installingWorker.state) {
        case 'installed':
          if (navigator.serviceWorker.controller) {
            ga('send', 'event', 'ServiceWorker', 'Installed', 'New or updated content is available')
          } else {
            ga('send', 'event', 'ServiceWorker', 'Installed', 'Content is cached')
          }
          break

        case 'redundant':
          console.error('The installing service worker became redundant')
          ga('send', 'event', 'ServiceWorker', 'Redundant')
          break
        }

      }
    }
  }).catch(function (e) {
    console.error('Error during service worker registration: ', e)
    ga('send', 'event', 'ServiceWorker', 'Error', e.message)
  })
}
