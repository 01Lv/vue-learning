import Vue from "vue";
import { Button, Form, FormItem, 
    Input, Message, Container, 
    Header, Aside, Main,Notification,
    Menu, Submenu, MenuItemGroup, MenuItem,
    Breadcrumb,BreadcrumbItem,
    Card,Row,Col,Alert,RadioGroup,RadioButton,
    Table,TableColumn,Switch,Tooltip,Pagination,
    Dialog,Dropdown, DropdownMenu,DropdownItem,
    MessageBox,Tree,Select,Option,Popover,
    Tag,Avatar} from 'element-ui';

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(Alert)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Popover)
Vue.use(Avatar)
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
