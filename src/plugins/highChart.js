import {Chart} from 'highcharts-vue';
import HighCharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting';
import usAnnotations from 'highcharts/modules/annotations'
import acessibility from 'highcharts/modules/accessibility'

export default {
    install(app, options) {
        exportingInit(HighCharts)
        acessibility(HighCharts)
        usAnnotations(HighCharts)
        app.component('Chart', Chart);
    }
}