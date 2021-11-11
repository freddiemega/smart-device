'use strict';

// аккордеон в подвале

var blockAddress = document.querySelector('.address');
var blockAddressToggle = blockAddress.querySelector('.address__button');
var blockAddressInfo = blockAddress.querySelector('.address__inner');
var svgPlus = blockAddress.querySelector('.address__button-plus');
var svgMinus = blockAddress.querySelector('.address__button-minus');

blockAddressInfo.classList.remove('address__inner--nojs');
svgPlus.classList.remove('address__button-plus--nojs');
svgMinus.classList.remove('address__button-minus--nojs');

blockAddressToggle.addEventListener('click', function () {
  if (blockAddressInfo.classList.contains('address__inner--closed')) {
    blockAddressInfo.classList.remove('address__inner--closed');
    blockAddressInfo.classList.add('address__inner--opened');
    svgPlus.classList.remove('address__button-plus--show');
    svgPlus.classList.add('address__button-plus--hide');
    svgMinus.classList.remove('address__button-minus--hide');
    svgMinus.classList.add('address__button-minus--show');
  } else {
    blockAddressInfo.classList.add('address__inner--closed');
    blockAddressInfo.classList.remove('address__inner--opened');
    svgPlus.classList.remove('address__button-plus--hide');
    svgPlus.classList.add('address__button-plus--show');
    svgMinus.classList.remove('address__button-minus--show');
    svgMinus.classList.add('address__button-minus--hide');
  }
});

var blockNav = document.querySelector('.page-footer__nav');
var blockNavToggle = blockNav.querySelector('.page-footer__nav-button');
var blockNavInfo = blockNav.querySelector('.nav-list');
var svgNavPlus = blockNav.querySelector('.page-footer__button-plus');
var svgNavMinus = blockNav.querySelector('.page-footer__button-minus');

blockNavInfo.classList.remove('nav-list--nojs');
svgNavPlus.classList.remove('page-footer__button-plus--nojs');
svgNavMinus.classList.remove('page-footer__button-minus--nojs');

blockNavToggle.addEventListener('click', function () {
  if (blockNavInfo.classList.contains('nav-list--closed')) {
    blockNavInfo.classList.remove('nav-list--closed');
    blockNavInfo.classList.add('nav-list--opened');
    svgNavPlus.classList.remove('page-footer__button-plus--show');
    svgNavPlus.classList.add('page-footer__button-plus--hide');
    svgNavMinus.classList.remove('page-footer__button-minus--hide');
    svgNavMinus.classList.add('page-footer__button-minus--show');
  } else {
    blockNavInfo.classList.add('nav-list--closed');
    blockNavInfo.classList.remove('nav-list--opened');
    svgNavPlus.classList.remove('page-footer__button-plus--hide');
    svgNavPlus.classList.add('page-footer__button-plus--show');
    svgNavMinus.classList.remove('page-footer__button-minus--show');
    svgNavMinus.classList.add('page-footer__button-minus--hide');
  }
});

// модальное окно

var modalOverlay = document.querySelector('.modal-overlay');
var modalCall = modalOverlay.querySelector('.modal-call');
var buttonToOpenModal = document.querySelector('.page-header__inner-button');
var buttonToCloseModal = document.querySelector('.modal-call__button-close');

var userNameField = modalCall.querySelector('[name="user-name"]');

buttonToOpenModal.addEventListener('click', function (e) {
  e.preventDefault();
  modalOverlay.classList.remove('visually-hidden');
  modalOverlay.classList.add('modal-overlay--open');
  modalCall.classList.add('modal-call--open');
  userNameField.focus();
  document.body.style.overflow = 'hidden';

  if (modalCall.classList.contains('modal-call--open')) {
    window.addEventListener('click', function (el) {
      if (el.target === modalOverlay) {
        document.body.style.overflow = 'visible';
        modalOverlay.classList.remove('modal-overlay--open');
        modalCall.classList.remove('modal-call--open');
      }
    });
    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        document.body.style.overflow = 'visible';
        modalOverlay.classList.remove('modal-overlay--open');
        modalCall.classList.remove('modal-call--open');
      }
    });
    buttonToCloseModal.addEventListener('click', function () {
      document.body.style.overflow = 'visible';
      modalOverlay.classList.remove('modal-overlay--open');
      modalCall.classList.remove('modal-call--open');
    });
  }

});

// плавный скролл к якорю

var buttonToMoveAncor = document.querySelector('.slogan__wrapper-button');

buttonToMoveAncor.addEventListener('click', function (e) {
  e.preventDefault();
  document.getElementById('feedback-form').scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
});

// запись полей формы в Local Storage

var blockModalForm = document.querySelector('.modal-call__inner');
var formInModal = blockModalForm.querySelector('[method="post"]');
var userName = formInModal.querySelector('[name="user-name"]');
var userPhone = formInModal.querySelector('[name="user-telephone"]');
var userMessage = formInModal.querySelector('[name="user-question"]');

formInModal.addEventListener('submit', function (evt) {
  if (!userName.value || !userPhone.value || !userMessage.value) {
    evt.preventDefault();
  } else {
    localStorage.setItem('userName', userName.value);
    localStorage.setItem('userPhone', userPhone.value);
    localStorage.setItem('userMessage', userMessage.value);
  }
});

// маска для поля ввода номера телефона

[].forEach.call(document.querySelectorAll('[name="user-telephone"]'), function (input) {
  var keyCode;
  function makePhoneMask(event) {
    if (event.code === 'Tab') {
      return;
    }
    keyCode = event.keyCode;
    var position = input.selectionStart;
    if (position < 3) {
      event.preventDefault();
    }
    var PATTERN = '+7 (___) ___-__-__';
    var i = 0;
    var def = PATTERN.replace(/\D/g, '');
    var val = input.value.replace(/\D/g, '');
    var newValue = PATTERN.replace(/[_\d]/g, function (a) {
      return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
    });
    i = newValue.indexOf('_');
    if (i !== -1) {
      if (i < 5) {
        i = 3;
      }
      newValue = newValue.slice(0, i);
    }
    var reg = PATTERN.substr(0, input.value.length).replace(/_+/g,
        function (a) {
          return '\\d{1,' + a.length + '}';
        }).replace(/[+()]/g, '\\$&');
    reg = new RegExp('^' + reg + '$');
    if (!reg.test(input.value) || input.value.length < 5 || keyCode > 47 && keyCode < 58) {
      input.value = newValue;
    }
    if (event.type === 'blur' && input.value.length < 5) {
      input.value = '';
    }
  }

  input.addEventListener('input', makePhoneMask, false);
  input.addEventListener('focus', makePhoneMask, false);
  input.addEventListener('blur', makePhoneMask, false);
  input.addEventListener('keydown', makePhoneMask, false);
});
