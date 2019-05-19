<template>
    <!--<div class="balance-container">-->
        <!--<h2>{{value}} </h2>-->
        <!--<p>{{label}}</p>-->
    <!--</div>-->

    <div class="card">
        <div class="card-body">
            <div class="row">
                <div class="col-5 icon">

                        <eva-icon :name="icon" animation="pulse" :fill="color" width="32" height="32"></eva-icon>

                </div>
                <div class="col-7">
                    <div class="numbers">
                        <div>
                            <h4 class="card-title">{{value}} {{suffix}}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <hr>
            <div class="stats">
                <div>
                    <i class="fa fa-refresh"></i>
                    {{label}}
                </div>
            </div>
        </div>
    </div>


</template>

<script>

  import State from '../State'

  export default {
    name: "Balance",
    props: {
      value: Number,
      label: String,
      icon: String,
      color: String,
      suffix: String
    }
  };
</script>

<style>

    .card {
        border-radius: 4px;
        background-color: #fff;
        margin-bottom: 30px;
        border: 1px solid rgba(0,0,0,.125);
    }

    .card-footer {
        background-color: transparent;
        line-height: 30px;
        border-top: none!important;
        font-size: 14px;
        padding: 0 15px 10px;
        color: #a9a9a9;
    }

    .numbers {
        font-size: 1.8rem;
        text-align: right;
        font-weight: 300;
    }

    .card-title {
        text-align: right;
        margin-right: 20px;
        font-weight: 100;
    }

    .icon {
        width: 100px;
        float: left;
    }

    .balance-container {
        text-align: center;
        margin: auto;

        max-width: 200px;
        border-radius: 10px;
        background: #1c587a;
        color: white;
    }

    h2 {
        padding-top: 20px;
        margin-bottom: -2px;
    }

    p {
        padding-bottom: 20px;
    }

</style>
