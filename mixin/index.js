import noData from "@/assets/noData.png";
import huanzhemorentouxiang from '@/assets/huanzhemorentouxiang.png'
export const index = {
  data() {
    return {
      pageNo: 1,
      pageSize: 10,
      scrollStatus: false,
      scrollHeight: '',
      tableList: [],
      noData,
      huanzhemorentouxiang
    };
  },
  created() {},
  mounted() {
    this.getScrollHeight();
  },
  methods: {
    refresh() {
      if (this.scrollStatus) return; //正在刷新
      this.scrollStatus = true;
      this.tableList = [];
      this.pageNo = 1;
      this.getList();
    },
    //设置下拉组件高度问题
    getScrollHeight() {
      let head = uni.createSelectorQuery().select('#head');
      let headHeight = '';
      head
        .boundingClientRect(function (data) {
          if (!data) return;
          //data - 各种参数
          headHeight = data.height;
        })
        .exec();
      //获取元素信息
      setTimeout(() => {
        if (headHeight == '') return;
        const res = uni.getSystemInfoSync().windowHeight;
        let height = res - headHeight - 55; //70是底部tabbar高度，因为是组件无法识别
        this.scrollHeight = `height:` + height + `px`;
      }, 1000);
    },
    loadMore() {
      if (this.scrollStatus) return; //正在刷新
      this.scrollStatus = true;
      this.pageNo += 1;
      this.getList();
    },
  },
};
