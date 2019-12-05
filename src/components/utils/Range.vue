<template>
    <div>
        <div class="range">
            <input
                type="range"
                min="1980"
                max="2020"
                step="10"
                v-model="test">
        </div>

        <ul class="range-labels">
            <li>1980</li>
            <li>1990</li>
            <li>2000</li>
            <li>2010</li>
            <li class="active selected">2018</li>
        </ul>
    </div>
</template>

<script>
    import $ from "jquery";

    export default {
        name: "Range",
        data: () => ({
            test: 2018,
        }),
        watch: {
            test (val) {
                this.$emit('update:cursor', val)
            }
        },
        mounted() {
            var sheet = document.createElement('style'),
                $rangeInput = $('.range input'),
                prefs = ['webkit-slider-runnable-track', 'moz-range-track', 'ms-track'];

            document.body.appendChild(sheet);

            var getTrackStyle = function (el) {
                var curVal = el.value,
                    val = (curVal - 1) * 1.2,
                    style = '';

                // Set active label
                $('.range-labels li').removeClass('active selected');

                var curLabel = $('.range-labels').find('li:nth-child(' + curVal + ')');

                curLabel.addClass('active selected');
                curLabel.prevAll().addClass('selected');

                return style;
            }

            $rangeInput.on('input', function () {
                sheet.textContent = getTrackStyle(this);
            });

            $('.range-labels li').on('click', function () {
                var index = $(this).index();

                $rangeInput.val(index + 1).trigger('input');

            });
        }
    }
</script>

<style
    scoped
    lang="scss">
    body {
        padding: 100px;
    }

    @mixin rangeThumb {
        width: 18px;
        height: 18px;
        margin: -8px 0  0;
        border-radius: 50%;
        background: #ce492f;
        cursor: pointer;
        border: 0 !important;
    }

    @mixin rangeTrack {
        width: 100%;
        height: 2px;
        cursor: pointer;
        background: #ce492f;
    }

    .range {
        position: relative;
        width: 550px;
        height: 5px;
    }

    .range input {
        width: 100%;
        position: absolute;
        top: 2px;
        height: 0;
        -webkit-appearance: none;

        // Thumb
        &::-webkit-slider-thumb {
            -webkit-appearance: none; // needed again for Chrome & Safari
            @include rangeThumb;
        }

        &::-moz-range-thumb {
            @include rangeThumb;
        }

        &::-ms-thumb {
            @include rangeThumb;
        }

        // Track
        &::-webkit-slider-runnable-track {
            @include rangeTrack;
        }

        &::-moz-range-track {
            @include rangeTrack;
        }

        &::-ms-track {
            @include rangeTrack;
        }

        &:focus { // override outline/background on focus
            background: none;
            outline: none;
        }

        &::-ms-track { // A little somethin' somethin' for IE
            width: 100%;
            cursor: pointer;
            background: transparent;
            border-color: transparent;
            color: transparent;
        }
    }

    // Labels below slider
    .range-labels {
        margin: 18px -41px 0;
        padding: 0;
        list-style: none;

        li {
            position: relative;
            float: left;
            width: 127px;
            text-align: center;
            color: #b2b2b2;
            font-size: 20px;
            cursor: pointer;
            pointer-events: none;
        }

        .selected::before {
            background: #ce492f;
        }

        .active.selected::before {
            display: none;
        }
    }
</style>