import { ResponsiveCalendar } from '@nivo/calendar'
import { ResponsiveTimeRange } from '@nivo/calendar';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
// const [ timeRangeData, setTimeRangeData, isTimeRangeLoading, isTimeRangeError] = useFetch(`/reports/day-activity/${dateRange[0].format("YYYY-MM-DD")}/${dateRange[1].format("YYYY-MM-DD")}`)



function TimeRangeChart({ dateRange, dayActivityData }) {

    return (
        <>
        {/* {JSON.stringify(timeRangeData)} */}
        {/* {JSON.stringify(dayActivityData)} */}


    <ResponsiveTimeRange
    // <ResponsiveCalendar
        // data={timeRangeData}
        data={dayActivityData}
        from={dateRange[0]?.format("YYYY-MM-DD")}
        to={dateRange[1]?.format("YYYY-MM-DD")}
        emptyColor="#eeeeee"
        colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        // direction="vertical"
        square={false}
        dayBorderWidth={1}
        dayBorderColor="#ffffff"
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'row',
                justify: false,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: 'right-to-left',
                translateX: -40,
                translateY: -40,
                symbolSize: 20
            }
        ]}
        />
        </>

)};

export default TimeRangeChart