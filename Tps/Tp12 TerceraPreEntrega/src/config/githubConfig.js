import passport from 'passport'
import config from './config.js'
import userServices from '../services/userService.js'
import GitHubStrategy from 'passport-github2'

const US = new userServices()

const initializeGithub = () => {
    
    passport.use('github', new GitHubStrategy({
        clientID: `${config.clienteId}`,
        clientSecret: `${config.clientSecret}`,
        calbackURL: 'http://localhost:8080/api/github/githubcallback'
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const {login } = profile
            const user = await US.createUser(login,'','','')

            return done (null, user)
        } catch(e) {
            done(e)
        }
    }
    ))
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
        const user = await US.getByID(id)
        done(null, user);
    });

}

export default initializeGithub
