function getShortUserDescription(user) {
    if (!user || typeof user !== 'object') {
        return '-';
    }
    if (user.name) {
        return user.name;
    } else if (user.email) {
        return user.email;
    } else {
        return 'name/email unknown';
    }
}

export default getShortUserDescription;
