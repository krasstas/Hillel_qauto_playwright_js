
// --- FILE: BasePageObject.page.js ---

import { ClipboardHelper } from '../frameworks/clipboard.helper.js';
import { UIFacade } from '../frameworks/ui.facade.js';
import { SmartActions } from '../frameworks/smart.actions.js';

export class BasePageObject {
  constructor(page, root) {
    this.page = page;
    this.root = root ?? page.locator('body');

    this.clipboard = new ClipboardHelper(page);
    this.actions = new SmartActions(page);
  }

  get ui() {
    return new UIFacade(this.page, this.root);
  }

  h({ level, text, index } = {}) {
    return this.ui.h({ level, text, index });
  }

  button({ name, index, icon, ariaLabel, value, id, exact, className } = {}) {
    return this.ui.button({ name, index, icon, ariaLabel, value, id, exact, className });
  }

  input({ label, index } = {}) {
    return this.ui.input({ label, index });
  }

  label({ label, index } = {}) {
    return this.ui.label({ label, index });
  }

  select({ label, name, index } = {}) {
    return this.ui.select({ label, name, index });
  }

  table({ name, index } = {}) {
    return this.ui.table({ name, index });
  }

  modal({ name, ariaLabel } = {}) {
    return this.ui.modalWindow({ text: name, ariaLabel });
  }

  widgetMenu({ index, text, className } = {}) {
    return this.ui.widgetMenu({ index, text, className });
  }

  widgetMenuV2({ text } = {}) {
    return this.ui.widgetMenuV2({ text });
  }

  filter({ filterName, placeholder, index, classNameInside } = {}) {
    return this.ui.filter({filterName, placeholder, index, classNameInside });
  }

  listBox({ text } = {}) {
    return this.ui.listBox({ text });
  }

  overlay({ text, index } = {}) {
    return this.ui.overlayActive({ text, index });
  }

  overlayManuable({ text, index } = {}) {
    return this.ui.overlayManuable({ text, index });
  }

  overlayTooltip() {
    return this.ui.overlayTooltip();
  }

  link({ text, href, exact, index } = {}) {
    return this.ui.link({ text, href, exact, index });
  }

  checkbox({ label, index } = {}) {
    return this.ui.checkbox({ label, index });
  }

  icon({ className, index } = {}) {
    return this.ui.icon({ className, index });
  }

  div({ text, className, attribute, index, indexOn, ariaDescribedby, classNameInside, id, testId } = {}) {
    return this.ui.div({ text, className, attribute, index, indexOn, ariaDescribedby, classNameInside, id, testId });
  }

  treeGrid({ index } = {}) {
    return this.ui.treeGrid({ index });
  }

  overlayList() {
    return this.ui.overlayList();
  }

  tableFooter({ text } = {}) {
    return this.ui.tableFooter({ text });
  }

  vPagination({ text, index } = {}) {
    return this.ui.vPagination({ text, index });
  }

  vueNotification({ text, index } = {}) {
    return this.ui.vueNotification({ text, index });
  }

  img({ src, index } = {}) {
    return this.ui.img({ src, index });
  }

  imgByClass({ className, index } = {}) {
    return this.ui.imgByClass({ className, index });
  }

  navActive({ text } = {}) {
    return this.ui.navActive({ text });
  }

  vCard({ text, index } = {}) {
    return this.ui.vCard({ text, index });
  }

  buttonToggle() {
    return this.ui.buttonToggle();
  }

  chip({ name, index, icon, exact } = {}) {
    return this.ui.chip({ name, index, icon, exact });
  }

  tooltip({ text, index, exact } = {}) {
    return this.ui.tooltip({ text, index, exact });
  }

  tooltipActive({ text, index } = {}) {
    return this.ui.tooltipActive({ text, index });
  }

  dropdownMenu({ text, index } = {}) {
    return this.ui.dropdownMenu({ text, index });
  }

  modalWindow({ text, ariaLabel } = {}) {
    return this.ui.modalWindow({ text, ariaLabel });
  }

  vTimeline({ index } = {}) {
    return this.ui.vTimeline({ index });
  }

  visTimeline({ index } = {}) {
    return this.ui.visTimeline({ index });
  }

  span({ text, index, className, id } = {}) {
    return this.ui.span({ text, index, className, id });
  }

  vueToastification({ text } = {}) {
    return this.ui.vueToastification({ text });
  }

  vueSnackNotification({ text } = {}) {
    return this.ui.vueSnackNotification({ text });
  }

  vueCustomNotification({ text } = {}) {
    return this.ui.vueCustomNotification({ text });
  }

  svg({ className, d, index } = {}) {
    return this.ui.svg({ className, d, index });
  }

  gChart({ index } = {}) {
    return this.ui.gChart({ index });
  }

  bWidget({ text, index, ariaLabel } = {}) {
    return this.ui.bWidget({ text, index, ariaLabel });
  }

  vList({ text, index } = {}) {
    return this.ui.vList({ text, index });
  }

  strong({ text, index } = {}) {
    return this.ui.strong({ text, index });
  }

  vMenu({ text, index } = {}) {
    return this.ui.vMenu({ text, index });
  }

  alert({ text, index } = {}) {
    return this.ui.alert({ text, index });
  }

  p({ text, index, className } = {}) {
    return this.ui.p({ text, index, className });
  }

  vListItem({ text, index } = {}) {
    return this.ui.vListItem({ text, index });
  }

  dpMenu({ text, index, ariaLabel } = {}) {
    return this.ui.dpMenu({ text, index, ariaLabel });
  }

  vTreeview({ text, index } = {}) {
    return this.ui.vTreeview({ text, index });
  }

  videoPlayer({ index } = {}) {
    return this.ui.videoPlayer({ index });
  }

  vProgressLinear({ index } = {}) {
    return this.ui.vProgressLinear({ index });
  }

  vWindow({ text, index } = {}) {
    return this.ui.vWindow({ text, index });
  }
}
