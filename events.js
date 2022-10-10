document.addEventListener('DOMContentLoaded', function () {
  var url = new URL(window.location.href);
  var catIdParam = url.searchParams.get("cat-id");
  var language = 'da';

  var swiper = new Swiper(".n-shops .n-featured-shops-wrapper .swiper", {
    slidesPerView: 1.2,
    spaceBetween: 30,
    navigation: {
      nextEl: '.w-slider-arrow-right',
      prevEl: '.w-slider-arrow-left',
    },
    breakpoints: {
      768: {
        slidesPerView: 2.5,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 4.5,
        spaceBetween: 30,
      },
    },
    on: {
      init: function() {
        $('.n-shops .n-featured-shops-wrapper .swiper .swiper-wrapper').css({display: 'flex'});
      }
    }
  });

  var errSectionSwiper = new Swiper(".slider-search-error .swiper", {
    slidesPerView: 1.2,
    spaceBetween: 30,
    navigation: {
      nextEl: '.w-slider-arrow-right',
      prevEl: '.w-slider-arrow-left',
    },
    breakpoints: {
      768: {
        slidesPerView: 2.5,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 4.5,
        spaceBetween: 30,
      },
    },
    on: {
      init: function() {
        $('.slider-search-error .swiper .swiper-wrapper').css({display: 'flex'});
      }
    }
  });

  var homeFeaturedSwiper = new Swiper(".featured-home .swiper", {
    slidesPerView: 1.2,
    spaceBetween: 30,
    navigation: {
      nextEl: '.w-slider-arrow-right',
      prevEl: '.w-slider-arrow-left',
    },
    breakpoints: {
      768: {
        slidesPerView: 2.5,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 4.5,
        spaceBetween: 30,
      },
    },
    on: {
      init: function() {
        $('.featured-home .swiper .swiper-wrapper').css({display: 'flex'});
      }
    }
  });

  var homeLatestSwiper = new Swiper(".latest-added .swiper", {
    slidesPerView: 1.2,
    spaceBetween: 30,
    navigation: {
      nextEl: '.w-slider-arrow-right',
      prevEl: '.w-slider-arrow-left',
    },
    breakpoints: {
      768: {
        slidesPerView: 2.5,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 4.5,
        spaceBetween: 30,
      },
    },
    on: {
      init: function() {
        $('.latest-added .swiper .swiper-wrapper').css({display: 'flex'});
      }
    }
  });

  var shopperFeaturedSwiper = new Swiper(".featured-shoppers .swiper", {
    slidesPerView: 1.2,
    spaceBetween: 30,
    navigation: {
      nextEl: '.w-slider-arrow-right',
      prevEl: '.w-slider-arrow-left',
    },
    breakpoints: {
      768: {
        slidesPerView: 2.5,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 4.5,
        spaceBetween: 30,
      },
    },
    on: {
      init: function() {
        $('.featured-shoppers .swiper .swiper-wrapper').css({display: 'flex'});
      }
    }
  });



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
      selector: '.n-featured-shops-wrapper .all-shop-list-wrapper',
      templateGetter: 'getAllShop',
      endpoint: 'shops',
      method: 'GET',
      queryParameters: {
        PageSize: 24,
        Language: language,
        display: true
      },
      version: 'v2',
      structure: 'data.result',
      after: 'getAllShop',
      setPage: true
    },
    featuredShops: {
      selector: '.n-shops .n-featured-shops-wrapper .swiper-wrapper .swiper-slide',
      templateGetter: 'getFeaturedShop',
      endpoint: 'shops',
      method: 'GET',
      queryParameters: {
        PageSize: 50,
        Language: language,
        Featured: true,
        display: true
      },
      version: 'v2',
      structure: 'data.result'
    },
    featuredShopsError: {
      selector: '.n-search-error-wrapper .slider-search-error .swiper-wrapper .swiper-slide',
      templateGetter: 'getFeaturedShop',
      endpoint: 'shops',
      method: 'GET',
      queryParameters: {
        PageSize: 50,
        Language: language,
        Featured: true,
        display: true
      },
      version: 'v2',
      structure: 'data.result'
    },
    featuredShopSwiper: {
      selector: '.swiper-box.featured-home .swiper-wrapper .swiper-slide',
      templateGetter: 'getFeaturedShop',
      endpoint: 'shops',
      method: 'GET',
      queryParameters: {
        PageSize: 50,
        Language: language,
        Featured: true,
        display: true
      },
      version: 'v2',
      structure: 'data.result'
    },
    featuredShopSwiperShopper: {
      selector: '.swiper-box.featured-shoppers .swiper-wrapper .swiper-slide',
      templateGetter: 'getFeaturedShop',
      endpoint: 'shops',
      method: 'GET',
      queryParameters: {
        PageSize: 50,
        Language: language,
        Featured: true,
        display: true
      },
      version: 'v2',
      structure: 'data.result'
    },
    lastestShopSwiper: {
      selector: '.latest-added .swiper .swiper-wrapper .swiper-slide',
      templateGetter: 'getFeaturedShop',
      endpoint: 'shops',
      method: 'GET',
      queryParameters: {
        PageSize: 50,
        Language: language,
        display: true,
        SortBy: 'CreatedDate'
      },
      version: 'v2',
      structure: 'data.result'
    },
    categories: {
      selector: '.n-checkbox-wrapper',
      templateGetter: 'getCategory',
      endpoint: 'categories',
      method: 'GET',
      queryParameters: {
        Language: language,
      },
      version: 'v1',
      structure: 'data',
      after: 'getCategory'
    },
    categoriesMenu: {
      selector: '.n-categories-grid-mega-menu',
      templateGetter: 'getCategoryMenu',
      endpoint: 'categories',
      method: 'GET',
      queryParameters: {
        Language: language,
      },
      version: 'v1',
      structure: 'data',
      limit: 14,
      after: 'getCategoryMenu'
    },
    featuredShopsMenu: {
      selector: '.n-menu-wrapper-featured .n-mm-feat-store-grid',
      templateGetter: 'getFeaturedShopMenu',
      endpoint: 'shops',
      method: 'GET',
      queryParameters: {
        PageSize: 50,
        Language: language,
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
          category = data.mainCategory.name;
        }

        var logoImageUrl = "https://uploads-ssl.webflow.com/630f0a12999419c9747bd320/63328cd7b24127bb78ef71c2_Frame%20631786.svg";
        if (data.logoImages.length) {
          logoImageUrl = data.logoImages[0].url;
        }

        return `
        <div class="n-wrapper-store-card">
          <a href="${data.marketingUrl}" class="n-store-link w-inline-block"></a>
          <div class="n-store-image-wrapper"><img src="${imageUrl}" loading="lazy" alt="" class="n-store-image">
            <div class="n-logo-wrapper"><img src="${logoImageUrl}" loading="lazy" alt="" class="n-shop-logo"></div>
          </div>
          <div fs-cmsfilter-field="name" class="n-shop-name">${truncateString(data.name)}</div>
          <div class="n-card-category-name">${category}</div>
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
          category = data.mainCategory.name;
        }

        return `
          <div class="n-wrapper-store-card">
            <a href="${data.marketingUrl}" class="n-store-link w-inline-block"></a>
            <div class="n-store-image-wrapper"><img src="${imageUrl}" loading="lazy" alt="" class="n-store-image">
              <div class="n-logo-wrapper"><img src="${data.logoImages[0].url}" loading="lazy" alt="" class="n-shop-logo"></div>
            </div>
            <div fs-cmsfilter-field="name" class="n-shop-name">${truncateString(data.name)}</div>
            <div class="n-card-category-name">${category}</div>
          </div>
        `;
      },
      'getCategory': function (data) {
        var activateClass = '';
        if (data.id == catIdParam) {
          activateClass = "w--redirected-checked";
        }
        return data ? `<div role="listitem" class="n-item-filters w-dyn-item">
          <label class="w-checkbox n-checkbox-wrapper" data-cat-id="${data.id}">
          <div class="w-checkbox-input w-checkbox-input--inputType-custom n-checkbox ${activateClass}"></div>
          <input type="checkbox" name="checkbox-2" data-name="Checkbox 2" style="opacity:0;position:absolute;z-index:-1">
          <span class="n-checkbox-label-categories w-form-label" for="checkbox-2">
            ${data.name}
          </span>
        </label>
      </div>` : null;
      },
      'getSubCategory': function(data) {
        var data = data.data;
        return `
          <div class="n-tab-text n-hidden-on-devices" data-cat-id="${data.id}">${data.name}</div>
        `;
      },
      'getCategoryMenu': function(data) {
        return `
          <a href="/shop?cat-id=${data.id}" class="n-categories w-dropdown-link" tabindex="0">${data.name}</a>
        `;
      },
      'getFeaturedShopMenu': function (data) {
        if (!data) {
          return;
        }
        var imageUrl = "https://uploads-ssl.webflow.com/630f0a1299941995d67bd323/630f0a13999419760a7be359_ergoliving.dk.png";
        if (data.featuredBannerImages.length) {
          imageUrl = data.featuredBannerImages[0].url
        }

        var category = '';
        if (data.mainCategory) {
          category = `<div class="n-card-category-name">${data.mainCategory.name}</div>`;
        }

        var logoImageUrl = "https://uploads-ssl.webflow.com/630f0a12999419c9747bd320/63328cd7b24127bb78ef71c2_Frame%20631786.svg";
        if (data.logoImages.length) {
          logoImageUrl = data.logoImages[0].url;
        }

        return `
          <a id="w-node-ecf96125-5766-0774-c695-12f25e3a5a9f-68400413" href="${data.marketingUrl}" class="n-megamenu-fav-wrapper n-padding-vertical n-padding-xsmall w-inline-block" tabindex="0">
            <div class="n-mm-fav-card-image-wrapper"><img src="${imageUrl}" loading="lazy" alt="" class="n-fav-store-image">
              <div class="n-logo-wrapper-mega-menu"><img src="${logoImageUrl}" loading="lazy" alt="" class="n-shop-logo-mega-menu"></div>
            </div>
            <div class="n-mm-feat-store-name n-padding-top n-padding-xsmall">${data.name}</div>
            ${category}
          </a>
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
    return data.length;
  }

  async function createSlider(config, data) {
    var html = "";
    if (data === undefined) {
      try {
        var data = await anydayAPI(
          config.endpoint,
          config.method,
          config.queryParameters,
          config.version,
          config.structure
        );
      } catch (e) {
        console.log('Error occured while getting response from ' + config.endpoint);
        console.log(e);
        return;
      }
    }
    if (data.length) {
      var elements = $(config.selector);
      var randomIndex = [];
      var recLimit = Math.min(data.length, elements.length);
      while(randomIndex.length < recLimit){
          var r = Math.floor(Math.random() * data.length);
          if(randomIndex.indexOf(r) === -1) randomIndex.push(r);
      };
      var randomData = randomIndex.map(index => data[index]);
      elements.each(function (index) {
        $(this).html('');
        $(this).html(getTemplate(config.templateGetter, randomData[index]));
      });
    }
  }

  async function anydayAPI(path, method = "GET", data, version, structure, setPage) {
    const BASE_URL = "https://my.anyday.io/api/"+version+"/internal/";
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
      $('.n-pagination .previous-button, .n-pagination .load-more-button').removeClass('hidden').removeData('page');
      if (response.data.totalPages == 1) {
        $('.n-pagination .previous-button, .n-pagination .load-more-button').addClass('hidden');
      } else if(response.data.page === response.data.totalPages) {
        $('.n-pagination .load-more-button').addClass('hidden');
        $('.n-pagination .previous-button').attr('data-page', response.data.page - 1);
      } else {
        if (response.data.page === 1) {
          $('.n-pagination .previous-button').addClass('hidden');
          $('.n-pagination .load-more-button').attr('data-page', response.data.page + 1);
        } else {
          $('.n-pagination .load-more-button').attr('data-page', response.data.page + 1);
          $('.n-pagination .previous-button').attr('data-page', response.data.page - 1);
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
    $('.n-subcategories-wrapper-div').html(html)
    $('.n-subcategories-wrapper-div').show();
    $('.n-subcategories-wrapper-div .n-tab-text').show()
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
      ? `${string.substring(0, maxLength)}…`
      : string;

  function createCategoryMobileMenu(data) {
    return data.map(cat => {
      var html = `<div class="n-category-name">
        <div data-w-id="${cat.id}" class="sibling">
          <div class="n-mm-menu-link"><a href="/shop?cat-id=${cat.id}">${cat.name}</a></div>
        </div>
        <div style="display: none; transform: translate3d(100vw, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;" class="sibling-2 absolute">
          <div data-w-id="${cat.id}" class="n-mm-menu-header"><img src="https://uploads-ssl.webflow.com/630f0a12999419c9747bd320/632833cd94be2a75c049ba1d_Icon%20(39).svg" loading="lazy" alt="" class="n-mm-back">
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

  $('.previous-button:not(.hidden)').click(function (e) {
    e.preventDefault();
    createElements(collectShopParameter({ Page: $(this).data('page') }))
      .then(function () {
        $('html, body').animate({
          scrollTop: $(".n-filters-shops .n-h3").offset().top - 100
        }, 1000);
      });
  });
  
  $('.load-more-button:not(.hidden)').click(function (e) {
    e.preventDefault();
    createElements(collectShopParameter({ Page: $(this).data('page') }))
      .then(function () {
        $('html, body').animate({
          scrollTop: $(".n-filters-shops .n-h3").offset().top - 100
        }, 1000);
      });
  });

  $('.n-filters-wrapper').unbind('click').on('click', '.n-item-filters.w-dyn-item', function (event) {
    if ($(this).attr('data-checker')) {
      $('.n-item-filters.w-dyn-item').removeAttr('data-checker');
      return false;
    } else {
      $(this).attr('data-checker', 1);
    }

    if (!$(this).hasClass('n-item-filters')) return;
    var catArray = [];
    if (!$(this).find("div.w-checkbox-input").hasClass('w--redirected-checked')) {
      $('div.w-checkbox-input').removeClass('w--redirected-checked');
      catArray.push($(this).children().data('cat-id'));
      //displaySubcategory(catArray);
      if (catArray.length) {
        createElements({ ...config.allShops, queryParameters: { ...config.allShops.queryParameters, categoryIds: catArray } });
        $('.n-shops .n-featured-shops-wrapper:first').hide();
      }
    } else {
      $('div.w-checkbox-input').removeClass('w--redirected-checked');
      //displaySubcategory(catArray);
      createElements({ ...config.allShops });
      $('.n-shops .n-featured-shops-wrapper:first').show();
      return false;
    }
    $(this).find('.w-checkbox-input').addClass('w--redirected-checked');
    $('.n-search-wrapper .n-search-input').val('');
  });

  $('body').on('click', '.n-subcategories-wrapper-div .n-tab-text', function (event) {
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
    createElements({ ...config.allShops, queryParameters: { ...config.allShops.queryParameters, CategoryIds: catArray, Search: escapeHtml($('.n-search-input.w-input').val()) } })
      .then(count => {
        if (!count) {
          $('.n-shops .n-featured-shops-wrapper').hide();
          $('.n-search-error-wrapper').show();
          $('.n-pagination').hide();
          $('html, body').animate({
            scrollTop: $(".n-search-error-wrapper .n-search-error-text").offset().top - 100
          }, 1000);
          
        } else {
          $('.n-shops .n-featured-shops-wrapper').show();
          $('.n-search-error-wrapper').hide();
          $('.n-pagination').show();
          $('html, body').animate({
            scrollTop: $(".n-filters-shops .n-h3").offset().top - 100
          }, 1000);
        }
      });
  });

  $('.n-search-wrapper .n-search-input').keydown(function (event) { 
    event.stopImmediatePropagation();
    var id = event.key || event.which || event.keyCode || 0;   
    if (id == "Enter") {
      event.preventDefault();
      $('.n-absolute-elements-search .n-primary-button').trigger('click');
      return false;
    }
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
    $('.n-filters-wrapper-shops .n-filters-dropdown.w-dropdown').trigger('click');
  });

  
  $('.n-search-error-wrapper').hide();
  $('.n-subcategories-wrapper-div').hide();
  $('.n-clear-search-link').hide();

  if($('.n-section.shops .n-shops-wrapper .n-shops-sorting').length) {
    if (catIdParam) {
      createElements({ ...config.allShops, queryParameters: { ...config.allShops.queryParameters, CategoryIds: catIdParam } });
      $('.n-shops .n-featured-shops-wrapper:first').hide();
    } else {
      createElements(config.allShops);
    }
    createElements(config.categories).then(count => $('.n-item-filters').show());
    var storageFeatured = window.localStorage.getItem('featured');
    if (storageFeatured && JSON.parse(storageFeatured).expiry > Date.now()) {
      createSlider(config.featuredShops, JSON.parse(storageFeatured).shops);
      createSlider(config.featuredShopsError, JSON.parse(storageFeatured).shops);
    } else {
      window.localStorage.removeItem('featured');
      createSlider(config.featuredShops);
      createSlider(config.featuredShopsError);
    }
  }

  if ($('.swiper-box.featured-home').length) {
    var storageFeatured = window.localStorage.getItem('featured');
    if (storageFeatured && JSON.parse(storageFeatured).expiry > Date.now())
      createSlider(config.featuredShopSwiper, JSON.parse(storageFeatured).shops);
    else
      createSlider(config.featuredShopSwiper);
    createSlider(config.lastestShopSwiper);
  }

  if ($('.featured-shoppers').length) {
    var storageFeatured = window.localStorage.getItem('featured');
    if (storageFeatured && JSON.parse(storageFeatured).expiry > Date.now())
      createSlider(config.featuredShopSwiperShopper, JSON.parse(storageFeatured).shops);
    else
      createSlider(config.featuredShopSwiperShopper);
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
    // $(this).children('.sibling').next().css({
    //   display: 'block',
    //   transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
    //   'transform-style': 'preserve-3d',
    //   height: '200%',
    //   overflow: 'scroll'
    // }).animate({
    //   scrollTop: 0
    // });
    // $(this).parent('.sibling.absolute').css({
    //   display: 'block',
    //   transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
    //   'transform-style': 'preserve-3d',
    //   overflow: 'scroll'
    // }).animate({
    //   scrollTop: 0
    // });
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

  $('.n-gradient-arrow-left .n-categories-arrow-link-block').click(function () {
    var element = document.getElementsByClassName('n-list-filters-emp-copy')[0];
    element.scrollBy({
      left: -150,
      behavior: 'smooth'
    });
  });
  $('.n-gradient-arrow-right .n-categories-arrow-link-block').click(function () {
    var element = document.getElementsByClassName('n-list-filters-emp-copy')[0];
    element.scrollBy({
      left: 150,
      behavior: 'smooth'
    });
  });
});
