import { ButtonComponent } from '../components/ButtonComponent.js';
import { ChipComponent } from '../components/ChipComponent.js';
import { TableComponent } from '../components/TableComponent.js';
import { SelectComponent } from '../components/SelectComponent.js';
import { TooltipComponent } from '../components/TooltipComponent.js';
import { DropdownMenuComponent } from '../components/DropdownMenuComponent.js';
import { ModalComponent } from '../components/ModalComponent.js';
import { FilterComponent } from '../components/FilterComponent.js';
import { ButtonToggleComponent } from '../components/ButtonToggleComponent.js';
import { ListBoxComponent } from '../components/ListBoxComponent.js';
import { InputComponent } from '../components/InputComponent.js';
import { BaseComponent } from '../components/BaseComponent.js';
import { OverlayComponent } from '../components/OverlayComponent.js';
import { LinkComponent } from '../components/LinkComponent.js';
import { TreegridComponent } from '../components/TreegridComponent.js';
import { TableFooterComponent } from '../components/TableFooterComponent.js';
import { NavComponent } from '../components/NavComponent.js';
import { vTimelineComponent } from '../components/vTimelineComponent.js';
import { TreeView } from '../components/TreeViewComponent.js';
import { GChartComponent } from '../components/GChartComponent.js';
import { SvgComponent } from '../components/SvgComponent.js';
import { BWidget } from '../components/BWidgetComponent.js';
import { DpMenuComponent } from '../components/DpMenuComponent.js';
import { PaginationComponent } from '../components/PaginationComponent.js';
import { VWindowComponent } from '../components/VWindowComponent.js';

export class UIFacade {
  constructor(page, root) {
    this.page = page;
    this.root = root ?? page;
  }

  h({ level, text, index } = {}) {
    let locator = this.root.locator(`h${level}`);

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new BaseComponent(this.page, locator);
  }

  button({ name, index, icon, ariaLabel, value, id, exact = false, className } = {}) {
    let locator = this.root.locator('button');

    if (name) {
      locator = exact
        ? locator.filter({ hasText: new RegExp(`^${name}$`) })
        : locator.filter({ hasText: name });
    }

    if (className) {
      locator = this.root.locator(`button.${className}`);
    }

    if (icon) {
      locator = locator.filter({
        has: this.page.locator(`[class*="${icon}"]`),
      });
    }

    if (ariaLabel) {
      locator = this.root.locator(`button[aria-label*="${ariaLabel}"]`);
    }

    if (value) {
      locator = this.root.locator(`button[value="${value}"]`);
    }

    if (id) {
      locator = this.root.locator(`button[data-test-id="${id}"]`);
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new ButtonComponent(this.page, locator);
  }

  chip({ name, index, icon, exact = false } = {}) {
    let locator = this.root.locator('.v-chip');

    if (name) {
      locator = locator.filter({
        hasText: exact ? new RegExp(`^${name}$`) : name,
      });
    }

    if (icon) {
      locator = locator.filter({
        has: this.page.locator(`[class*="${icon}"]`),
      });
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new ChipComponent(this.page, locator);
  }

  table(nameOrOptions) {
    if (typeof nameOrOptions === 'string') {
      nameOrOptions = { name: nameOrOptions };
    }

    if (Number.isInteger(nameOrOptions)) {
      nameOrOptions = { index: nameOrOptions };
    }

    const { name, index } = nameOrOptions ?? {};

    let locator = this.root.locator('table');

    if (name) {
      locator = locator.filter({ hasText: name });
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new TableComponent(this.page, locator);
  }

  select(nameOrOptions) {
    if (nameOrOptions && typeof nameOrOptions === 'string') {
      nameOrOptions = { name: nameOrOptions };
    }

    let locator;
    nameOrOptions
      ? (locator = this.root
          .locator('.v-input')
          .filter({ hasText: nameOrOptions.name }))
      : (locator = this.root.locator('.v-input'));

    return new SelectComponent(this.page, locator);
  }

  tooltip({ text, index, exact = false } = {}) {
    let locator = this.root.locator('.v-tooltip__content');

    if (text) {
      locator = exact
        ? locator.filter({ hasText: new RegExp(`^${text}$`) })
        : locator.filter({ hasText: text });
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new TooltipComponent(this.page, locator);
  }

  tooltipActive({ text, index } = {}) {
    let locator = this.root.locator('.menuable__content__active');

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new TooltipComponent(this.page, locator);
  }

  dropdownMenu({ text, index } = {}) {
    let locator = this.root.getByRole('menu');

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new DropdownMenuComponent(this.page, locator);
  }

  modalWindow({ text, ariaLabel } = {}) {
    let locator = this.root.locator('[role="dialog"]');

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    if (ariaLabel) {
      locator = this.root.locator(`[aria-label="${ariaLabel}"]`);
    }

    return new ModalComponent(this.page, locator);
  }

  filter({ filterName, placeholder, index, classNameInside } = {}) {
    let locator = this.root.locator('.v-input');

    if (filterName) {
      locator = locator.filter({ hasText: filterName });
    }

    if (placeholder) {
      locator = locator.filter({
        has: this.page.getByPlaceholder(placeholder),
      });
    }

    if (classNameInside) {
      locator = locator.filter({
        has: this.page.locator(`.${classNameInside}`),
      });
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new FilterComponent(this.page, locator);
  }

  buttonToggle() {
    const locator = this.root.locator('.v-btn-toggle');
    return new ButtonToggleComponent(this.page, locator);
  }

  listBox({ text } = {}) {
    let locator = this.root.getByRole('listbox');

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    return new ListBoxComponent(this.page, locator);
  }

  input({ label, index } = {}) {
    let locator = this.root.locator('input');
    if (label) {
      locator = this.root.locator('.v-input').filter({ hasText: label }).locator('input');
    }
    if (index !== undefined) locator = locator.nth(index);
    return new InputComponent(this.page, locator);
  }

  label({ index } = {}) {
    let locator = this.root.locator('.v-label');

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new BaseComponent(this.page, locator);
  }

  checkbox({ label, index } = {}) {
    let locator = this.root.locator('.v-input');

    if (label) {
      locator = locator.filter({ has: this.page.getByText(label) });
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new InputComponent(this.page, locator);
  }

  filterCheckbox({ label, index } = {}) {
    let locator = this.root.locator('.v-switch');

    if (label) {
      locator = locator.filter({
        has: this.page.getByText(label),
      });
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new FilterComponent(this.page, locator);
  }

  overlayActive({ text, index } = {}) {
    let locator = this.root.locator('.v-overlay--active');

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new OverlayComponent(this.page, locator);
  }

  overlayManuable({ text, index } = {}) {
    let locator = this.root.locator('.menuable__content__active');

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new OverlayComponent(this.page, locator);
  }

  overlayTooltip() {
    const locator = this.root.locator('[role="tooltip"].v-overlay--active');
    return new OverlayComponent(this.page, locator);
  }

  link({ text, href, exact = false, index } = {}) {
    let locator = this.root.locator('a');

    if (text) {
      locator = exact
        ? locator.filter({ hasText: new RegExp(`^${text}$`) })
        : locator.filter({ hasText: text });
    }

    if (href) {
      locator = this.root.locator(`[href*="${href}"]`);
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new LinkComponent(this.page, locator);
  }

  icon({ className, index } = {}) {
    let locator = this.root.locator(`i${className ? '.' + className : ''}`);

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new BaseComponent(this.page, locator);
  }

  div({ text, className, attribute, index, indexOn = true, ariaDescribedby, classNameInside, id, testId } = {}) {
    let locator = this.root.locator('div');

    if (text || className) {
      locator = this.root
        .locator(`div${className ? '.' + className : ''}`)
        .filter({ hasText: text });
    }

    if (attribute) {
      locator = this.root.locator(`div[${attribute}]`);
    }

    if (attribute && text) {
      locator = this.root
        .locator(`div[${attribute}]`)
        .filter({ hasText: text });
    }

    if (ariaDescribedby) {
      locator = this.root.locator(
        `div[aria-describedby*="${ariaDescribedby}"]`,
      );
    }

    if (classNameInside) {
      locator = locator.filter({
        has: this.page.locator(`.${classNameInside}`),
      });
    }

    if (id) {
      locator = this.root.locator(`div#${id}`);
    }

    if (testId) {
      locator = this.root.locator(`div[data-test-id="${testId}"]`);
    }

    if (indexOn && index !== undefined) {
      locator = locator.nth(index);
    }

    return new BaseComponent(this.page, locator);
  }

  vueNotification({ text, index } = {}) {
    let locator = this.root.locator('.vue-notification-wrapper');

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new BaseComponent(this.page, locator);
  }

  widgetMenu({ index, text, className } = {}) {
    let locator = this.root.locator('.v-menu__content');

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    if (className) {
      locator = this.root.locator('.menuable__content__active');
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new FilterComponent(this.page, locator);
  }

  widgetMenuV2({ text } = {}) {
    let locator = this.root.locator('.dp--menu-wrapper');

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    return new FilterComponent(this.page, locator);
  }

  li({ text } = {}) {
    let locator = this.root.locator('li');

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    return new BaseComponent(this.page, locator);
  }

  vList({ text, index } = {}) {
    let locator = this.root.locator('.v-list');

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new ListBoxComponent(this.page, locator);
  }

  gridcell({ text, id, exact = false } = {}) {
    let locator;

    if (text) {
      locator = exact
        ? this.root
            .getByRole('gridcell')
            .filter({ hasText: new RegExp(`^${text}$`) })
        : this.root.getByRole('gridcell').filter({ hasText: text });
    }

    if (id) {
      locator = this.root.locator(`#${id}`);
    }

    return new BaseComponent(this.page, locator);
  }

  overlayList() {
    const locator = this.root.locator('.v-overlay--active.v-menu');
    return new BaseComponent(this.page, locator);
  }

  treeGrid({ index } = {}) {
    let locator = this.root.locator('.b-hbox');

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new TreegridComponent(this.page, locator);
  }

  treeView({ index } = {}) {
    let locator = this.root.locator('.v-treeview');

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new TreeView(this.page, locator);
  }

  tableFooter({ text } = {}) {
    let locator = this.root.locator('.v-data-table-footer');

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    return new TableFooterComponent(this.page, locator);
  }

  img({ src = '.', index } = {}) {
    let locator = this.root.locator(`img[src*="${src}"]`);

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new BaseComponent(this.page, locator);
  }

  imgByClass({ className, index } = {}) {
    let locator = this.root.locator(className ? `img.${className}` : 'img');

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new BaseComponent(this.page, locator);
  }

  navActive({ text } = {}) {
    let locator = this.page.locator('nav.v-navigation-drawer');

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    return new NavComponent(this.page, locator);
  }

  vCard({ text, index } = {}) {
    let locator = this.page.locator('.v-card');

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new BaseComponent(this.page, locator);
  }

  vTimeline({ index } = {}) {
    let locator = this.page.locator('.v-timeline');

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new vTimelineComponent(this.page, locator);
  }

  visTimeline({ index } = {}) {
    let locator = this.page.locator('.vis-timeline');

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new vTimelineComponent(this.page, locator);
  }

  span({ text, index, className, id } = {}) {
    let locator = this.root.locator('span');

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    if (className) {
      locator = this.root.locator(`span.${className}`);
    }

    if (id) {
      locator = this.root.locator(`span#${id}`);
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new BaseComponent(this.page, locator);
  }

  gChart({ index } = {}) {
    let locator = this.root.locator('g.chart');

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new GChartComponent(this.page, locator);
  }

  svg({ className, d, index } = {}) {
    let locator = this.root.locator(className ? `svg.${className}` : 'svg');

    if (d) {
      locator = locator.filter({ has: this.page.locator(`[d*="${d}"]`) });
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new SvgComponent(this.page, locator);
  }

  vueToastification({ text } = {}) {
    let locator = this.root.locator('.Vue-Toastification__container');

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    return new BaseComponent(this.page, locator);
  }

  vueSnackNotification({ text } = {}) {
    let locator = this.root.locator('.v-snack--active');

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    return new BaseComponent(this.page, locator);
  }

  vueCustomNotification({ text } = {}) {
    let locator = this.root.locator('.custom-notification');

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    return new BaseComponent(this.page, locator);
  }

  bWidget({ text, index, ariaLabel } = {}) {
    let locator = this.root.locator('.b-widget');

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    if (ariaLabel) {
      locator = this.root.locator(`.b-widget[aria-label="${ariaLabel}"]`);
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new BWidget(this.page, locator);
  }

  vListItem({ text, index } = {}) {
    let locator = this.root.locator('.v-list-item');

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new BaseComponent(this.page, locator);
  }

  vTreeview({ text, index } = {}) {
    let locator = this.root.locator('.v-treeview');

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new TreeView(this.page, locator);
  }

  strong({ text, index } = {}) {
    let locator = this.root.locator('strong');

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new BaseComponent(this.page, locator);
  }

  vMenu({ text, index } = {}) {
    let locator = this.root.locator('.menuable__content__active');

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new BaseComponent(this.page, locator);
  }

  alert({ text, index } = {}) {
    let locator = this.root.getByRole('alert');

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new BaseComponent(this.page, locator);
  }

  dpMenu({ text, index, ariaLabel } = {}) {
    let locator = this.root.locator('div.dp__menu');

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    if (ariaLabel) {
      locator = locator.and(this.root.locator(`[aria-label="${ariaLabel}"]`));
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new DpMenuComponent(this.page, locator);
  }

  p({ text, index, className } = {}) {
    let locator = this.root.locator(`p${className ? `.${className}` : ''}`);

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new BaseComponent(this.page, locator);
  }

  vPagination({ text, index } = {}) {
    let locator = this.root.locator('.v-pagination');

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new PaginationComponent(this.page, locator);
  }

  videoPlayer({ index } = {}) {
    let locator = this.root.locator('video');

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new BaseComponent(this.page, locator);
  }

  vProgressLinear({ index } = {}) {
    let locator = this.root.locator('.v-progress-linear--active');

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new BaseComponent(this.page, locator);
  }

  vWindow({ text, index } = {}) {
    let locator = this.root.locator('.v-window');

    if (text) {
      locator = locator.filter({ hasText: text });
    }

    if (index !== undefined) {
      locator = locator.nth(index);
    }

    return new VWindowComponent(this.page, locator);
  }
}