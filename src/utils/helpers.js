

export const getHostname = url => url && url.split('/')[2];

export const getPostedTimeString = postedDateTime => {

    if( !postedDateTime ) {
        return '';
    }

    const postedDateTimeObj = new Date( postedDateTime );
    const postedDate = postedDateTimeObj.getDate();
    const postedMonth = postedDateTimeObj.getMonth() + 1;
    const popstedYear = postedDateTimeObj.getFullYear();
    const postedMinutes = postedDateTimeObj.getMinutes();
    const postedHours = postedDateTimeObj.getHours();

    const date = new Date();
    const currentDate = date.getDate();
    const currentMonth = date.getMonth() + 1;
    const crrentYear = date.getFullYear();
    const currentHours = date.getHours();
    const currentMinutes = date.getMinutes();

    console.log( popstedYear );
    console.log( postedMonth );
    console.log( postedDate );
    console.log( postedMinutes );
    console.log( '-------------' );
    console.log( crrentYear );
    console.log( currentMonth );
    console.log( currentDate );
    console.log( currentMinutes );

    if(  0 < ( crrentYear - popstedYear ) ) {
        return `${crrentYear - popstedYear} years ago`;
    } else if( 0 < ( currentMonth - postedMonth ) ) {
        return `${currentMonth - postedMonth} months ago`;
    } else if( 0 < ( currentDate - postedDate ) ) {
        return `${currentDate - postedDate} days ago`;
    } else if( 0 < ( currentHours - postedHours ) ) {
        return `${currentHours - postedHours} hours ago`;
    }else if( 0 < currentMinutes - postedMinutes ) {
        return `${currentMinutes - postedMinutes} minutes ago`
    } else {
        return '0 minutes ago';
    }
}