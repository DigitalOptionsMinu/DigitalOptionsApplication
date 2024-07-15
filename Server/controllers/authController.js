const User = require('../models/user')
const { hashPassword, comparePassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken')

const test = (req, res) =>{}

//Register Point
const registerUser = async(req, res) =>{
    const regex = /^[\d+-]+$/;
    try{
        const {name, email, phone, password} = req.body;
        //check if name was entered
        if(!name){
            return res.json({
                error: 'Te rog introdu un nume'
            })
        };

        if (!regex.test(phone)) {
            return res.json({
                error: 'Numarul de telefon nu este valid. Ex: 0740123123'
            })
        }

        //check is name is good
        if(!name || name.length <3){
            return res.json({
                error: 'Numele trebuie sa contina minim 3 caractere.'
            })
        }

        //check is password is good
        if(!password || password.length <6){
            return res.json({
                error: 'Parola trebuie sa contina minim 6 caractere.'
            })
        }
        //check email
        const exist = await User.findOne({email});
        if(exist) {
            return res.json({
                error: 'Email is taken already'
            })
        }
        
        const hashedPassword = await hashPassword(password)

        const user = await User.create({
            name, 
            email,
            phone, 
            password: hashedPassword,
        })

        return res.json(user)
    } catch(error){
        console.log(error)       
    }
}

//Login Point
const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Verifică dacă utilizatorul există
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          error: `Nu am găsit nici un utilizator cu adresa de email ${email}`,
        });
      }
  
      // Verifică dacă parola este corectă
      const match = await comparePassword(password, user.password);
      if (!match) {
        return res.status(401).json({
          error: 'Parola introdusă nu este corectă!',
        });
      }
  
      // Generare și semnare token JWT
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
          }).json(user);
        }
      );
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Eroare internă de server' });
    }
  };
  

const getProfile = async (req, res) => {
    try {
        // Extragem token-ul din cookie-ul 'token' al request-ului
        const token = req.cookies.token;

        // Verificăm dacă există un token
        if (!token) {
            return res.status(401).json({ error: 'Acces neautorizat. Token-ul lipsește.' });
        }

        // Decodăm token-ul JWT pentru a obține informațiile utilizatorului
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.error('Eroare verificare token JWT:', err);
                return res.status(401).json({ error: 'Acces neautorizat. Token invalid sau expirat.' });
            }

            // Extragem id-ul utilizatorului din token
            const userId = decodedToken.id;

            // Căutăm utilizatorul în baza de date folosind id-ul
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'Utilizatorul nu a fost găsit.' });
            }

            // Returnăm informațiile utilizatorului
            res.json(user);
        });

    } catch (error) {
        console.error('Eroare getProfile:', error);
        res.status(500).json({ error: 'Eroare internă de server' });
    }
};

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
}