module.exports = async (client) => {
    const activities = client.config.status.activities
    const status = client.config.status.status_types

    let a = 0;
    let s = 0;

    setInterval(() => {
        if(a >= activities.length) a = 0
        client.user.setActivity(activities[a])
        a++;
    }, 5000);

    setInterval(() => {
        if(s > 3){
            s = 0;
        }
        client.user.setStatus(status[s]);
        s++;
    }, 30000);

    client.logger.info(`Logged in as ${client.user.tag}!`);
};