document.addEventListener('DOMContentLoaded', function () {
  var url = new URL(window.location.href);
  var catIdParam = url.searchParams.get("cat-id");
  $(".btn-login").click(function () {
    console.log('login clicked!');
    window.rudderanalytics.track('Login Click');
  });
  $(".btn-signup, .hero-shoppers").click(function () {
    console.log('signup clicked!');
    window.rudderanalytics.track('Signup Click');
  });
  $(".shopper-link, body > div.navbar.no-dropdown.w-nav > div.container-width-100.nav-container.w-container > div > div.div-block-42 > nav > div.div-block-256 > div.div-block-73 > div > a:nth-child(1)").click(function () {
    console.log('shopper clicked!');
    window.rudderanalytics.track('Shopper Click');
  });
  $(".shop-link, .shop-btn, body > div.navbar.no-dropdown.w-nav > div.container-width-100.nav-container.w-container > div > div.div-block-42 > nav > div.div-block-256 > div.div-block-73 > div > a:nth-child(2)").click(function () {
    console.log('shop clicked!');
    window.rudderanalytics.track('Shop Click');
  });
  $(".webshop-link, .webshops, body > div.navbar.no-dropdown.w-nav > div.container-width-100.nav-container.w-container > div > div.div-block-42 > nav > div.div-block-256 > div.div-block-73 > div > a:nth-child(3)").click(function () {
    console.log('webshop clicked!');
    window.rudderanalytics.track('webshop Click');
  });
  // Weglot.on("languageChanged", function () {
  //   console.log('language clicked!');
  //   window.rudderanalytics.track('Language changed');
  // });

  const config = {
    allShops: {
      selector: '.n-shops-collection-list',
      templateGetter: 'getAllShop',
      endpoint: 'shops',
      method: 'GET',
      queryParameters: {
        PageSize: 24,
        Language: 'da',
        display: true
      },
      version: 'v2',
      structure: 'data.result',
      after: 'getAllShop',
      setPage: true
    },
    featuredShops: {
      selector: '.n-featured-shops-wrapper .swiper-wrapper',
      templateGetter: 'getFeaturedShop',
      endpoint: 'shops',
      method: 'GET',
      queryParameters: {
        PageSize: 50,
        Language: 'da',
        Featured: true,
        display: true
      },
      version: 'v2',
      structure: 'data.result'
    },
    categories: {
      selector: '.n-wrapper-collection-filters-copy .n-list-filters-emp-copy',
      templateGetter: 'getCategory',
      endpoint: 'categories',
      method: 'GET',
      queryParameters: {
        Language: 'da',
      },
      version: 'v1',
      structure: 'data',
      after: 'getCategory'
    },
    categoriesMenu: {
      selector: '.n-menu-wrapper-categories .w-dyn-list .w-dyn-items',
      templateGetter: 'getCategoryMenu',
      endpoint: 'categories',
      method: 'GET',
      queryParameters: {
        Language: 'da',
      },
      version: 'v1',
      structure: 'data',
      limit: 14,
      after: 'getCategoryMenu'
    },
    featuredShopsMenu: {
      selector: '.n-menu-wrapper-featured .w-dyn-items',
      templateGetter: 'getFeaturedShopMenu',
      endpoint: 'shops',
      method: 'GET',
      queryParameters: {
        PageSize: 50,
        Language: 'da',
        Featured: true
      },
      limit: 6,
      version: 'v2',
      structure: 'data.result',
      after: 'getFeaturedShopMenu',
      randomizeData: true
    },
  }

  function getTemplate(name,data) {
    var templatesFunctions = {
      'getAllShop': function (data) {
        if (!data /*|| !data.display*/) {
          return '';
        }
        var imageUrl = "https://uploads-ssl.webflow.com/630f0a12999419c9747bd320/63328cd7b24127bb78ef71c2_Frame%20631786.svg";
        if (data.featuredBannerImages.length) {
          imageUrl = data.featuredBannerImages[0].url
        }
        var category = '';
        if (data.mainCategory) {
          category = `<div class="n-category-wrapper">
          <div class="n-category-text">
            ${data.mainCategory.name}
          </div>
        </div>`;
        }
        return `
        <div role="listitem" class="w-dyn-item">
          <div class="n-wrapper-store-card">
            <a href="${data.marketingUrl}" class="n-store-link w-inline-block">
              ${category}
            </a>
            <img src="${imageUrl}" loading="lazy" alt="" class="n-store-image">
            <div fs-cmsfilter-field="name" class="n-shop-name">
              ${truncateString(data.name)}
            </div>
          </div>
        </div>
        `;
      },
      'getFeaturedShop': function(data) {
        if (!data /*|| !data.display*/) {
          return '';
        }
        var imageUrl = "https://uploads-ssl.webflow.com/630f0a12999419c9747bd320/63328cd7b24127bb78ef71c2_Frame%20631786.svg";
        if (data.featuredBannerImages.length) {
          imageUrl = data.featuredBannerImages[0].url
        }
        var category = '';
        if (data.mainCategory) {
          category = `<div class="n-category-wrapper-featured">
                <div class="n-category-text-featured">${data.mainCategory.name}</div>
              </div>`;
        }
        return `
          <div class="swiper-slide n-wrapper-store-card">
            <a href="${data.marketingUrl}" class="n-store-link w-inline-block">
              ${category}
            </a><img src="${imageUrl}" loading="lazy" alt="" class="n-store-image">
            <div class="n-shop-name">${truncateString(data.name)}</div>
          </div>
        `;
      },
      'getCategory': function (data) {
        var activateClass = '';
        if (data.id == catIdParam) {
          activateClass = "w--redirected-checked";
        }
        return data ? `
          <div role="listitem" class="n-item-filters w-dyn-item">
            <label class="w-checkbox n-checkbox-wrapper" data-cat-id="${data.id}">
              <div class="w-checkbox-input w-checkbox-input--inputType-custom n-checkbox ${activateClass}"></div>
              <input type="checkbox" id="checkbox-2" name="checkbox-2" data-name="Checkbox 2" style="opacity:0;position:absolute;z-index:-1">
              <span class="n-checkbox-label-categories w-form-label" for="checkbox-2">
                ${data.name}
              </span>
            </label>
          </div>
        ` : null;
      },
      'getSubCategory': function(data) {
        var index = data.index
        var data = data.data;
        return `
          <a data-w-tab="${data.name}"
            class="n-tab-subcategories w-inline-block w-tab-link"
            tabindex="-1"
            id="w-tabs-${index}-data-w-tab-${index}"
            href="#w-tabs-${index}-data-w-pane-${index}"
            role="tab" aria-controls="w-tabs-${index}-data-w-pane-${index}"
            aria-selected="false"
            data-cat-id="${data.id}">
            <div>${data.name}</div>
          </a>
        `;
      },
      'getCategoryMenu': function(data) {
        return `
          <div role="listitem" class="w-dyn-item">
            <a href="/shop?cat-id=${data.id}" class="n-categories w-dropdown-link" tabindex="0">
              ${data.name}
            </a>
          </div>`;
      },
      'getFeaturedShopMenu': function (data) {
        if (!data) {
          return;
        }
        var imageUrl = "https://uploads-ssl.webflow.com/630f0a1299941995d67bd323/630f0a13999419760a7be359_ergoliving.dk.png";
        if (data.featuredBannerImages.length) {
          imageUrl = data.featuredBannerImages[0].url
        }
        return `
          <div role="listitem" class="w-dyn-item">
            <a href="${data.url}" class="n-megamenu-fav-wrapper n-padding-vertical n-padding-xsmall w-inline-block" tabindex="0">
              <img src="${imageUrl}" loading="lazy" alt="" class="n-fav-store-image">
              <div class="n-categories-copy n-padding-top n-padding-xsmall">${data.name}</div>
            </a>
          </div>
        `;
      }
    }
    return templatesFunctions[name](data);
  }

  function getBefore(name, data) {
    var beforeFunctions = {
      'getAllShop': function (data) {
        return '';
      },
      'getFeaturedShop': function(data) {
        return ``;
      },
      'getCategory': function (data) {
        return '';
      }
    }
    return beforeFunctions[name] ? beforeFunctions[name](data) : null;
  }

  function getAfter(name, data) {
    var afterFunctions = {
      'getAllShop': function (data) {
        if (data && data.length) {
          $('.n-featured-shops-wrapper .w-dyn-empty').hide();
          $('.n-shops-collection-list').show();
        } else {
          $('.n-featured-shops-wrapper .w-dyn-empty').show();
          $('.n-shops-collection-list').hide();
        }
        return '';
      },
      'getFeaturedShop': function (data) {
        $(window).trigger('resize');
        return (data && data.length) ? `
            <div class="left-arrow w-slider-arrow-left" role="button" tabindex="0" aria-controls="w-slider-mask-0" aria-label="previous slide">
              <div class="n-arrow-div"><img src="https://uploads-ssl.webflow.com/630f0a12999419c9747bd320/632a8e5b94c9d18695b01993_Vector%20119.svg" loading="lazy" alt=""></div>
              <div class="icon-2 hidden w-icon-slider-left"></div>
            </div>
            <div class="right-arrow w-slider-arrow-right" role="button" tabindex="0" aria-controls="w-slider-mask-0" aria-label="next slide">
              <div class="n-arrow-div"><img src="https://uploads-ssl.webflow.com/630f0a12999419c9747bd320/632a90cd32d85fda4a8b9b2f_Vector%20120.svg" loading="lazy" alt=""></div>
              <div class="icon-2 hidden w-icon-slider-right"></div>
            </div>
        ` : '';
      },
      'getCategory': function (data) {
        window.categories = data;
        $('.n-wrapper-collection-filters-copy .w-dyn-empty').first().hide();
        return '';
      },
      'getCategoryMenu': function (data) {
        var localCategory = window.localStorage.getItem('category');
        if (localCategory === null) {
          const today = new Date();
          var tomorrow = new Date();
          tomorrow.setDate(today.getDate() + 1);
          window.localStorage.setItem('category', JSON.stringify({ categories: data, expiry: tomorrow.getTime()}));
        }
        $('.parent .sibling.absolute .n-category-name').remove();
        $('.parent .sibling.absolute').append(createCategoryMobileMenu(data));
        $('.n-filters-wrapper.n-disappear-on-desktop .sibling.absolute .n-category-name').remove();
        $('.n-filters-wrapper.n-disappear-on-desktop .sibling.absolute').append(createCategoryMobileMenu(data));
        if (data.length)
          $('.n-menu-wrapper-categories .w-dyn-empty').first().hide();
        else
          $('.n-menu-wrapper-categories .w-dyn-empty').first().show();
        return '';
      },
      'getFeaturedShopMenu': function (data) {
        var localFeatured = window.localStorage.getItem('featured');
        if (localFeatured === null) {
          const today = new Date();
          var tomorrow = new Date();
          tomorrow.setDate(today.getDate() + 1);
          window.localStorage.setItem('featured', JSON.stringify({ shops: data, expiry: tomorrow.getTime()}));
        }
        if (data.length)
          $('.n-menu-wrapper-featured .w-dyn-empty').hide();
        else
          $('.n-menu-wrapper-featured .w-dyn-empty').show();
        return '';
      }
    }
    return afterFunctions[name] ? afterFunctions[name](data) : null;
  }

  async function createElements(config, data) {
    var html = "";
    var origData;
    if (data === undefined) {
      try {
        data = await anydayAPI(
          config.endpoint,
          config.method,
          config.queryParameters,
          config.version,
          config.structure,
          config.setPage ? config.setPage : undefined
        );
      } catch (e) {
        console.log('Error occured while getting response from ' + config.endpoint);
        console.log(e);
        return;
      }
    }
    if (config.randomizeData) {
      if (data.length) {
        var randomIndex = [];
        var recLimit = Math.min(data.length, config.limit)
        while(randomIndex.length < recLimit){
            var r = Math.floor(Math.random() * data.length);
            if(randomIndex.indexOf(r) === -1) randomIndex.push(r);
        };
        var randomData = randomIndex.map(index => data[index]);
        origData = data;
        data = randomData;
      }
    }
    
    var limit = config.limit ? config.limit : data.length;
    html += (config.before && getBefore(config.before, data) !== null) ? getBefore(config.before, data) : '';
    for (let i = 0; i < limit; i++) {
      html += getTemplate(config.templateGetter, data[i]);
    }
    if (config.randomizeData) {
      data = origData;
    }
    html += (config.after && getAfter(config.after, data) !== null) ? getAfter(config.after, data) : '';
    $(config.selector).first().html('');
    $(config.selector).first().html(html);
  }

  async function createSlider(config) {
    var html = "";
    try {
      var data = await anydayAPI(
        config.endpoint,
        config.method,
        config.queryParameters,
        config.version,
        config.structure
      );
    } catch (e) {
      console.log('Error occured while getting response from '+config.endpoint);
      console.log(e);
      return;
    }
    if (data.length) {
      var elements = $('.swiper-wrapper .swiper-slide');
      elements.each(function(index) {
        $(this).html(getTemplate(config.templateGetter, data[index]));
      });
    }
  }

  async function anydayAPI(path, method = "GET", data, version, structure, setPage) {
    const BASE_URL = "https://anyday-acceptance.yadyna.xyz/api/"+version+"/internal/";
    queryString = "";
    if (method === "GET" && data !== undefined) {
      var queryString = Object.keys(data).map(function (key) {
        if (key === 'categoryIds' && Array.isArray(data[key])) {
          var categoriesIds = data[key];
          return Object.keys(categoriesIds).map(function (index) {
            return 'CategoryIds=' + categoriesIds[index];
          }).join('&');
        }
        return key + '=' + data[key];
      }).join('&');
      queryString = "?" + queryString;
    }
    var response = await $.get(BASE_URL + path.trim() + queryString);
    if (setPage) {
      $('.w-pagination-previous.previous-button, .w-pagination-next.load-more-button').removeClass('disabled').removeData('page');
      if (response.data.totalPages == 1) {
        $('.w-pagination-previous.previous-button, .w-pagination-next.load-more-button').addClass('disabled');
      } else if(response.data.page === response.data.totalPages) {
        $('.w-pagination-next.load-more-button').addClass('disabled');
        $('.w-pagination-previous.previous-button').attr('data-page', response.data.page - 1);
      } else {
        if (response.data.page === 1) {
          $('.w-pagination-previous.previous-button').addClass('disabled');
          $('.w-pagination-next.load-more-button').attr('data-page', response.data.page + 1);
        }
      }
    }
    // {
    //   type: method,
    //   url: BASE_URL+path.trim()+queryString,
    //   dataType: "json",
    // }
    return processResponse(response, structure);
  }

  function processResponse(response, structure) {
    structure = structure.split(".");
    for (let i = 0; i < structure.length; i++) {
      response = response[structure[i]];
    }
    return response;
  }

  function displaySubcategory(catArray) {
    var categories = window.categories;
    categories = categories.filter(cat => catArray.includes(cat.id));
    var sub = [].concat(...categories.map(cat => cat['subCategories'] ? cat['subCategories'] : []));
    var html = "";
    for (let i = 0; i < sub.length; i++) {
      html += getTemplate('getSubCategory', { data: sub[i], index: i });
    }
    $('.tabs-menu.w-tab-menu').html(html)
    $('.tabs.w-tabs').show();
  }

  function escapeHtml(unsafe)
  {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  const truncateString = (string = '', maxLength = 24) =>
    string.length > maxLength
      ? `${string.substring(0, maxLength)}???`
      : string;

  function createCategoryMobileMenu(data) {
    return data.map(cat => {
      var html = `<div class="n-category-name">
        <div data-w-id="${cat.id}" class="sibling">
          <div class="n-mm-menu-link">${cat.name}</div>
        </div>
        <div style="display: none; transform: translate3d(100vw, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;" class="sibling-2 absolute">
          <div data-w-id="${cat.id}" class="n-mm-menu-header"><img src="images/Icon-39.svg" loading="lazy" alt="" class="n-mm-back">
            <div class="n-mm-header-link">Back to categories</div>
          </div>
          <div class="n-mm-menu-item-wrapper">
            <div class="n-mm-menu-heading">${cat.name}</div>
          </div>
          `;
      html += `<div class="n-mm-menu-item-wrapper">
          <a href="/shop?cat-id=${cat.id}" class="n-subcategory-name">View All</a>
        </div>`;
      html += cat.subCategories.map(subcat => {
        return `<div class="n-mm-menu-item-wrapper">
          <a href="/shop?cat-id=${subcat.id}" class="n-subcategory-name">${subcat.name}</a>
        </div>`
      }).join('');
      html += `</div>
      </div>`;
      return html;
    }).join('');
  }

  $('.previous-button:not(.disabled)').click(function () {
    createElements(collectShopParameter({Page: $(this).data('page')}));
  });
  $('.load-more-button:not(.disabled)').click(function () {
    createElements(collectShopParameter({Page: $(this).data('page')}));
  });

  $('body').on('click', '.n-item-filters', function (event) {
    if (!$('.n-item-filters').hasClass('n-item-filters'))
      return;
    var catArray = [];
    $('.n-list-filters-emp-copy .w-checkbox-input').removeClass('w--redirected-checked');
    if (!$(this).find("div").hasClass('w--redirected-checked'))
      catArray.push($(this).children().data('cat-id'));
    displaySubcategory(catArray);
    if(catArray.length)
      createElements({ ...config.allShops, queryParameters: { ...config.allShops.queryParameters, categoryIds: catArray } });
    $('.n-search-wrapper .n-search-input').val('');
  });

  $('body').on('click', '.n-tab-subcategories', function (event) {
    $('.n-tab-subcategories').removeClass('w--current');
    $(this).addClass('w--current');
    var id = $(this).data('cat-id');
    createElements({...config.allShops, queryParameters: {...config.allShops.queryParameters, CategoryIds: id}});
  });

  $('body').on('click', '.n-absolute-elements-search .n-primary-button', function (event) {
    var catArray = [];
    $('.n-list-filters-emp-copy .w--redirected-checked').each(function () {
      catArray.push($(this).closest("label").data('cat-id'));
    });
    createElements({ ...config.allShops, queryParameters: { ...config.allShops.queryParameters, CategoryIds: catArray, Search: escapeHtml($('.n-search-input.w-input').val()) } });
  });

  function collectShopParameter(param = {}) {
    var shopConfig;
    var catArray = [];
    shopConfig = { ...config.allShops, queryParameters: { ...config.allShops.queryParameters, SortBy: 'name' } };
    $('.n-list-filters-emp-copy .w--redirected-checked').each(function () {
      catArray.push($(this).closest("label").data('cat-id'));
    });
    if (catArray.length) {
      shopConfig = { ...shopConfig, queryParameters: { ...shopConfig.queryParameters, CategoryIds: catArray } };
    }
    if ($('.n-search-input.w-input').val().trim().length) {
      shopConfig = { ...shopConfig, queryParameters: { ...shopConfig.queryParameters, Search: escapeHtml($('.n-search-input.w-input').val()) } };
    }
    if ($('#w-dropdown-list-1').attr('data-sort-decending') && parseInt($('#w-dropdown-list-1').attr('data-sort-decending'))) {
      shopConfig = { ...shopConfig, queryParameters: { ...shopConfig.queryParameters, Ascending: false } };
    }
    if (!$.isEmptyObject(param)) {
      shopConfig = { ...shopConfig, queryParameters: { ...shopConfig.queryParameters, ...param } };
    }
    return shopConfig;
  }

  $('.w-dropdown-link').click(function () {
    if ($(this).text() === "Z-A") {
      createElements(collectShopParameter({ Ascending: false }));
      $('#w-dropdown-list-1').attr('data-sort-decending', '1')
    } else {
      $('#w-dropdown-list-1').attr('data-sort-decending', '0');
      createElements(collectShopParameter({ Ascending: true }));
    }
    $('.n-filters-drop.w-dropdown-toggle').click();
  });

  
  $('.n-search-error-wrapper').hide();
  $('.tabs.w-tabs').hide();
  $('.n-clear-search-link').hide();

  if($('.n-section.shops .n-shops-wrapper .n-shops-sorting').length) {
    if (catIdParam) {
      createElements({ ...config.allShops, queryParameters: { ...config.allShops.queryParameters, CategoryIds: catIdParam } });
    } else {
      createElements(config.allShops);
    }
    createElements(config.categories);
    createSlider(config.featuredShops);
  }
  var storageCategory = window.localStorage.getItem('category');
  if (storageCategory && JSON.parse(storageCategory).expiry > Date.now()) {
    createElements(config.categoriesMenu, JSON.parse(storageCategory).categories)
  } else {
    window.localStorage.removeItem('category');
    createElements(config.categoriesMenu);
  }
  var storageFeatured = window.localStorage.getItem('featured');
  if (storageFeatured && JSON.parse(storageFeatured).expiry > Date.now()) {
    createElements(config.featuredShopsMenu, JSON.parse(storageFeatured).shops)
  } else {
    window.localStorage.removeItem('featured');
    createElements(config.featuredShopsMenu);
  }
  

  /**
   * Category clicked -> Show subcatgory list -> restrict Category list height to 100vh and overflow hidden
   */
  $('body').on('click', '.n-category-name', function (e) {
    $(this).children('.sibling').next().css({
      display: 'block',
      transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
      'transform-style': 'preserve-3d',
      height: '100vh'
    });
    $(this).parent('.sibling.absolute').css({
      display: 'block',
      transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
      'transform-style': 'preserve-3d',
      height: '100vh',
      overflow: 'hidden'
    });
    e.stopPropagation();
  });

  /**
   * Sub Category Back clicked 
   */
  $('body').on('click', '.sibling-2.absolute .n-mm-menu-header', function (e) {
    $(this).parent('.sibling-2.absolute').css({
      display: 'none',
      transform: 'translate3d(100vw, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
      'transform-style': 'preserve-3d'
    });
    $(this).closest('.sibling.absolute').css({
      display: 'block',
      transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
      'transform-style': 'preserve-3d',
      height: '100vh',
      overflow: 'scroll'
    });
    e.stopPropagation();
  });

  /**
   * Category Back clicked 
   */
  $('body').on('click', '.sibling.absolute .n-mm-menu-header', function (e) {
    $(this).parent('.sibling.absolute').css({
      display: 'none',
      transform: 'translate3d(100vw, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
      'transform-style': 'preserve-3d'
    });
    e.stopPropagation();
  });

  $('.menu-button-3.w-nav-button').click(function () {
    $('.sibling.absolute').hide();
  });
});
