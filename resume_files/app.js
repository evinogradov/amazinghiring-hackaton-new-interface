// Generated by CoffeeScript 1.7.1
var AH, availableTags, fixInputWidth, randomizeSearch;

AH = {};

AH.css = {
  hidden: "m-hidden"
};

AH.elements = {
  html: $("html"),
  body: $("body"),
  document: $(document)
};

AH.helpers = {
  elements: {
    dropdown: {
      selectors: {
        container: ".b-dropdown",
        title: ".b-dropdown__title",
        block: ".b-dropdown__block",
        list: ".b-dropdown__list",
        listItem: ".b-dropdown__item",
        listItemInner: ".b-dropdown__item-inner"
      },
      classes: {
        staticDropdown: "b-dropdown_static"
      },
      initialize: function(selector) {
        this.onItemInnerClickProxy = $.proxy(this.onItemInnerClick, this);
        this.onTitleClickProxy = $.proxy(this.onTitleClick, this);
        this.onBodyClickProxy = $.proxy(this.onBodyClick, this);
        AH.elements.html.undelegate(this.selectors.listItemInner, "click", this.onItemInnerClickProxy).delegate(this.selectors.listItemInner, "click", this.onItemInnerClickProxy);
        AH.elements.html.undelegate(this.selectors.title, "click", this.onTitleClickProxy).delegate(this.selectors.title, "click", this.onTitleClickProxy);
        return AH.elements.html.undelegate("body", "click", this.onBodyClickProxy).delegate("body", "click", this.onBodyClickProxy);
      },
      onItemInnerClick: function(e) {
        var container;
        container = $(e.currentTarget).parents(this.selectors.container);
        if (!container.hasClass(this.classes.staticDropdown)) {
          return container.find(this.selectors.block).addClass(AH.css.hidden);
        }
      },
      onTitleClick: function(e) {
        var block;
        block = $(e.currentTarget).parents(this.selectors.container).find(this.selectors.block);
        AH.elements.body.find(this.selectors.block).not(block).addClass(AH.css.hidden);
        return block.toggleClass(AH.css.hidden);
      },
      onBodyClick: function(e) {
        var target;
        target = $(e.target);
        if (!target.parents().is(this.selectors.container)) {
          return AH.elements.body.find(this.selectors.block).addClass(AH.css.hidden);
        }
      }
    },
    switcher: {
      selectors: {
        container: ".b-switcher",
        control: ".b-switcher__control",
        inner: ".b-switcher__inner",
        label: ".b-switcher__label",
        labelOn: ".b-switcher__label_on",
        labelOff: ".b-switcher__label_off"
      },
      classes: {
        on: "b-switcher_on"
      },
      initialize: function() {
        this.onControlClickProxy = $.proxy(this.onControlClick, this);
        this.onOnLabelClickProxy = $.proxy(this.onOnLabelClick, this);
        this.onOffLabelClickProxy = $.proxy(this.onOffLabelClick, this);
        AH.elements.html.undelegate(this.selectors.control, "click", this.onControlClickProxy).delegate(this.selectors.control, "click", this.onControlClickProxy);
        AH.elements.html.undelegate(this.selectors.labelOn, "click", this.onOnLabelClickProxy).delegate(this.selectors.labelOn, "click", this.onOnLabelClickProxy);
        return AH.elements.html.undelegate(this.selectors.labelOff, "click", this.onOffLabelClickProxy).delegate(this.selectors.labelOff, "click", this.onOffLabelClickProxy);
      },
      onControlClick: function(e) {
        var container;
        container = $(e.currentTarget).parents(this.selectors.container);
        container.toggleClass(this.classes.on);
        if (container.hasClass(this.classes.on)) {
          return container.data({
            value: "on"
          });
        } else {
          return container.data({
            value: "off"
          });
        }
      },
      onOnLabelClick: function(e) {
        return $(e.currentTarget).parents(this.selectors.container).addClass(this.classes.on).data({
          value: "on"
        });
      },
      onOffLabelClick: function(e) {
        return $(e.currentTarget).parents(this.selectors.container).removeClass(this.classes.on).data({
          value: "off"
        });
      }
    }
  },
  initialize: function() {
    var element, name, _ref, _results;
    _ref = this.elements;
    _results = [];
    for (name in _ref) {
      element = _ref[name];
      _results.push(element.initialize());
    }
    return _results;
  }
};

AH.helpers.initialize();

$("body").delegate(".b-form__value-input", "focus", (function(_this) {
  return function(e) {
    return $(e.currentTarget).parents(".b-form__value-input-outer").addClass("b-form__value-input-outer_editing");
  };
})(this));

$("body").delegate(".b-form__value-input", "blur", (function(_this) {
  return function(e) {
    return fixInputWidth($(e.currentTarget));
  };
})(this));

fixInputWidth = function(inputs) {
  return inputs.each(function(i, input) {
    var fake, value, width;
    input = $(input);
    fake = input.siblings(".b-form__value-input_fake");
    value = input.val().trim();
    if (value) {
      fake.text(value);
      input.parents(".b-form__value-input-outer").removeClass("b-form__value-input-outer_editing");
      width = fake.width();
      return input.width(width);
    }
  });
};

fixInputWidth($(".b-form__value-input"));

$("body").delegate(".b-form__key-dropdown-item .b-dropdown__item-inner", "click", (function(_this) {
  return function(e) {
    var companySwitcher, target, value;
    target = $(e.currentTarget);
    value = $.trim(target.text());
    companySwitcher = target.parents(".b-form__key-dropdown-item").find(".b-switcher");
    if (companySwitcher.length && companySwitcher.data("value") === "on") {
      value = "Текущая компания";
    }
    return target.parents(".b-form__key-dropdown").siblings(".b-form__key-title").find(".b-form__key-title-inner").text(value);
  };
})(this));

$("body").delegate(".b-form__key-dropdown-item .b-switcher", "click", (function(_this) {
  return function(e) {
    return setTimeout(function() {
      var switcher, title;
      switcher = $(e.currentTarget);
      title = switcher.parents(".b-form__key-dropdown").siblings(".b-form__key-title").find(".b-form__key-title-inner");
      if (title.text() === "Компания" || title.text() === "Текущая компания") {
        if (switcher.data("value") === "on") {
          return title.text("Текущая компания");
        } else {
          return title.text("Компания");
        }
      }
    });
  };
})(this));

$("body").delegate(".b-form__values-add", "click", (function(_this) {
  return function(e) {
    var el, html;
    el = $(e.currentTarget).prev(".b-form__value");
    html = el.get(0).outerHTML;
    el.after(html);
    return fixInputWidth($(".b-form__value-input"));
  };
})(this));

$("body").delegate(".b-form__value-remove", "click", (function(_this) {
  return function(e) {
    return $(e.currentTarget).prev(".b-form__value").remove();
  };
})(this));

$("body").delegate(".b-form__find", "click", (function(_this) {
  return function(e) {
    $(".b-app__body-title").addClass("b-app__body-title_collapsed");
    $(".b-form").addClass("b-form_collapsed");
    return $(".b-search").removeClass("m-hidden");
  };
})(this));

availableTags = ["actionscript", "applescript", "asp", "basic", "c", "c++", "clojure", "cobol", "coldfusion", "erlang", "fortran", "groovy", "haskell", "java", "javascript", "lisp", "perl", "php", "python", "ruby", "scala", "scheme"];

$(".b-form__value-input").autocomplete({
  source: availableTags,
  close: function(e, ui) {
    return $(e.target).focusout().blur();
  }
});

$(".b-form__key-exclude-checkbox").on("change", (function(_this) {
  return function(e) {
    var checkbox, query;
    checkbox = $(e.currentTarget);
    query = checkbox.parents(".b-form__row");
    if (checkbox.is(":checked")) {
      return query.addClass("b-form__row_excluded");
    } else {
      return query.removeClass("b-form__row_excluded");
    }
  };
})(this));

$(".b-filter__range").eq(0).slider({
  range: true,
  min: 20,
  max: 60,
  step: 5,
  values: [25, 45],
  stop: function() {
    return randomizeSearch();
  }
});

$(".b-filter__range").eq(1).slider({
  range: true,
  min: 20,
  max: 60,
  step: 5,
  values: [20, 35],
  stop: function() {
    return randomizeSearch();
  }
});

$(".b-filter__range").eq(2).slider({
  range: true,
  min: 20,
  max: 60,
  step: 5,
  values: [35, 50],
  stop: function() {
    return randomizeSearch();
  }
});

$("body").delegate(".b-filter__list-checkbox input[type=checkbox]", "change", (function(_this) {
  return function() {
    return randomizeSearch();
  };
})(this));

randomizeSearch = function() {
  $(".b-app__body-spinner").removeClass("m-hidden");
  return setTimeout(function() {
    $(".b-search__results").html(_.shuffle($(".b-profile-short")));
    return $(".b-app__body-spinner").addClass("m-hidden");
  }, 600);
};

$("body").delegate(".b-profile__links-more", "click", (function(_this) {
  return function(e) {
    return $(e.currentTarget).parents(".b-profile__links").addClass("b-profile__links_expanded");
  };
})(this));

$("[data-toggle=tooltip]").tooltip();

$(".b-big-photo__close, .b-big-photo__bg").on("click", (function(_this) {
  return function() {
    return $(".b-big-photo").addClass("m-hidden");
  };
})(this));

$("body").delegate(".b-profile__photo", "click", (function(_this) {
  return function(e) {
    var photo, url;
    photo = $(e.currentTarget);
    url = photo.css("backgroundImage").replace(/^url\(/, '').replace(/\)$/, '');
    $(".b-big-photo__img").attr({
      src: url
    });
    return $(".b-big-photo").removeClass("m-hidden");
  };
})(this));

$("body").delegate(".b-profile-preview__bg, .b-profile-preview__close", "click", (function(_this) {
  return function() {
    $(".b-profile-preview").addClass("m-hidden");
    return $("body").removeClass("b-app_no-scroll");
  };
})(this));

$("body").delegate(".b-profile__short-button_preview", "click", (function(_this) {
  return function(e) {
    var img, name, profile;
    profile = $(e.currentTarget).parents(".b-profile-short");
    img = profile.find(".b-profile__photo").css("backgroundImage");
    name = profile.find('.b-profile__name').text().split(/\d/)[0].split('~')[0].trim();
    $(".b-profile-preview").find(".b-profile__photo").css("backgroundImage", img);
    $(".b-profile-preview").removeClass("m-hidden");
    $("body").addClass("b-app_no-scroll");
    return $(".b-profile-preview").find(".b-profile__name_temp_inner").text(name);
  };
})(this));

$("body").delegate(".b-profile__add-comment-textarea", "focus", (function(_this) {
  return function(e) {
    return $(e.currentTarget).addClass("b-profile__add-comment-textarea_focused");
  };
})(this));

$("body").delegate(".b-profile__add-comment-textarea", "blur", (function(_this) {
  return function(e) {
    if (!$(e.currentTarget).val().trim()) {
      return $(e.currentTarget).removeClass("b-profile__add-comment-textarea_focused");
    }
  };
})(this));

$("body").delegate(".b-profile__add-comment-button", "click", (function(_this) {
  return function(e) {
    var html, textarea, value;
    textarea = $(e.currentTarget).siblings(".b-profile__add-comment-textarea");
    value = textarea.val().trim();
    if (value) {
      html = '<li class="b-profile__comments-item"><div class="b-profile__comments-name">Егор Виноградов<div class="b-profile__comments-date">Сегодня</div><div class="b-profile__comments-dropdown"><span class="b-profile__comments-dropdown-title caret"></span></div></div><div class="b-profile__comments-text">' + value + '</div></li>';
      textarea.parent().siblings(".b-profile__comments").prepend(html);
      return textarea.val("").removeClass("b-profile__add-comment-textarea_focused");
    }
  };
})(this));

$("body").delegate(".b-profile__comments-more-button", "click", (function(_this) {
  return function(e) {
    return $(e.currentTarget).parents(".b-profile__comments").addClass("b-profile__comments_expanded");
  };
})(this));

$("body").delegate(".b-filters__reset", "click", (function(_this) {
  return function() {
    randomizeSearch();
    $(".b-filter__range").slider("values", [20, 60]);
    return _.each($(".b-filter__list-checkbox input[type=checkbox]"), function(checkbox) {
      return checkbox.checked = false;
    });
  };
})(this));

$("body").delegate(".b-profile__short-button_open", "click", (function(_this) {
  return function() {
    return window.open("profile.html");
  };
})(this));

$("body").delegate("a[href=#]", "click", (function(_this) {
  return function() {
    return false;
  };
})(this));

$("body").delegate(".b-search__pagination-item_number", "click", (function(_this) {
  return function(e) {
    var current, html, number;
    current = $(e.currentTarget);
    if (!current.hasClass("b-search__pagination-item_current")) {
      number = current.text();
      html = '<div class="b-search__divider"><div class="b-search__divider-inner">' + number + ' из 207</div></div>';
      $(".b-search__more").before(html);
      $(".b-search__more").before(_.shuffle($(".b-profile-short").clone()));
      return current.addClass("b-search__pagination-item_current").siblings().removeClass("b-search__pagination-item_current");
    }
  };
})(this));

$("body").delegate(".b-search__more", "click", (function(_this) {
  return function(e) {
    var current, html, number;
    current = $(".b-search__pagination-item_current").next();
    number = current.text();
    html = '<div class="b-search__divider"><div class="b-search__divider-inner">' + number + ' из 207</div></div>';
    $(".b-search__more").before(html);
    $(".b-search__more").before(_.shuffle($(".b-profile-short").clone()));
    return current.addClass("b-search__pagination-item_current").siblings().removeClass("b-search__pagination-item_current");
  };
})(this));

$("body").delegate(".b-form__value-remove", "click", (function(_this) {
  return function(e) {
    return $(e.currentTarget).parents(".b-form__value").remove();
  };
})(this));

$("body").delegate(".b-form__row-remove", "click", (function(_this) {
  return function(e) {
    return $(e.currentTarget).parents(".b-form__row").remove();
  };
})(this));

$("body").delegate(".b-form__rows-add", "click", (function(_this) {
  return function(e) {
    var row, value;
    row = $(".b-form__row").first().clone();
    value = row.find(".b-form__value").first().clone();
    row.find(".b-form__values").empty().append(value).append('<span class="b-form__values-add">+</span>').find(".b-form__value-input").val("");
    $(".b-form__rows").append(row);
    return setTimeout(function() {
      return row.find(".b-form__value-input-outer").addClass("b-form__value-input-outer_editing").find(".b-form__value-input").focus();
    });
  };
})(this));
