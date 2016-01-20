export default function(){
  'ngInject';
  return {
    restrict: 'A',
    link(scope, el) {
      let menu;
      function dropdownButtonClick() {
        menu.toggleClass('dropdown__menu-item--display');
      }
      function itemClick() {
        menu.removeClass('dropdown__menu-item--display');
      }

      let button = $('.dropdown__button', el);
      menu = button.siblings('.dropdown__menu');
      $('.dropdown__button', el).on('click', dropdownButtonClick);
      menu.on('click', '.dropdown__menu-item', itemClick);

      scope.$on('$destroy', () => {
        button.off('click', dropdownButtonClick);
        menu.off('click', '.dropdown__menu-item', itemClick);
        menu = null;
        button = null;
      });
    }
  };
}
