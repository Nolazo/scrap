const { chromium } = require('playwright')

//paginas a realizar la accion
const shops = [
  {
    vendor: 'Microsoft',
    url: 'https://www.xbox.com/es-es/configure/8WJ714N3RBTL',
    checkStock: async ({browser, url}) => {
      const page = await browser.newPage()
      await page.goto(url)
      const content = await page.textContent('[aria-label="Finalizar la compra del pack"]')
      const hasStock = content.includes('Sin existencias') == false
      return hasStock
    }
  }

]

//acciones que se realizaran en las paginas
;(async () =>{
  const browser = await chromium.launch()

  for (const shop of shops) {
   const {checkStock, vendor, url} = shop
   const hasStock = await checkStock({browser, url})
   console.log(`${vendor}: ${hasStock ? 'tiene😍' : 'no tiene😒'} stock`)
  }

  await browser.close()
})()