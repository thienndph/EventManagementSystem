// import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { User } from '@prisma/client';
// import { PrismaService } from 'prisma/prisma.service';
// import { LoginDto } from 'src/user/dtos/login-user.dto';
// import * as bcrypt from 'bcrypt';


// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly jwtService: JwtService,
//     private readonly prisma: PrismaService,
//   ) {}

//   async validateUser(user: any): Promise<User> {
//     const existingUser = await this.prisma.user.findUnique({ where: { email: user.email } });

//     if (!existingUser) {
//       // Nếu người dùng chưa tồn tại, tạo mới
//       const newUser = await this.prisma.user.create({
//         data: {
//           email: user.email, 
//           name: user.name,   
//           age: null,         
//           gender: null,     
//           dateOfBirth: null, 
//           address: null,     
//           phoneNumber: null,
//           idGoogle:user.idGoogle, 
               
//         },
//       });
//       return newUser;
//     }

//     return existingUser;
//   }

//   async login(user: any) {
//     const payload = { email: user.email, sub: user.id };
//     return {
//       access_token: this.jwtService.sign(payload)
//     };
//   }

//   async loginUser(loginDto: LoginDto) {
//     const { email, password } = loginDto;

//     // Tìm người dùng theo email
//     const user = await this.prisma.user.findUnique({
//         where: { email },
//     });

//     // Kiểm tra người dùng có tồn tại và mật khẩu đã được lưu
//     if (!user || !user.password) {
//         throw new UnauthorizedException('Invalid email or password');
//     }

//     // Kiểm tra mật khẩu có khớp không
//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//         throw new UnauthorizedException('Invalid email or password');
//     }

//     // Tạo token JWT với thông tin người dùng
//     const token = this.jwtService.sign({
//         id: user.id, // ID người dùng
//         email: user.email,
//         name: user.name,
//     });

//     // Trả về token và thông tin người dùng
//     return {
//         message: 'Login successful',
//         user: {
//             id: user.id,
//             email: user.email,
//             name: user.name,
//         },
//         token, // Trả về token JWT cho client
//     };
//  }


//  async loginAdmin(loginDto: LoginDto) {
//   const { email, password } = loginDto;

//   // Tìm người dùng theo email
//   const admin = await this.prisma.admin.findUnique({
//       where: { email },
//   });

//   // Kiểm tra người dùng có tồn tại và mật khẩu đã được lưu
//   if (!admin || !admin.password) {
//       throw new UnauthorizedException('Invalid email or password');
//   }

//   // Kiểm tra mật khẩu có khớp không
//   const passwordMatch = await bcrypt.compare(password, admin.password);
//   if (!passwordMatch) {
//       throw new UnauthorizedException('Invalid email or password');
//   }

//   // Tạo token JWT với thông tin người dùng
//   const token = this.jwtService.sign({
//       id: admin.id, // ID người dùng
//       email: admin.email,
//       name: admin.name,
//       role :admin.role,
//   });

//   // Trả về token và thông tin người dùng
//   return {
//       message: 'Login successful',
//       user: {
//           id: admin.id,
//           email: admin.email,
//           name: admin.name,
//       },
//       token, // Trả về token JWT cho client
//   };
// }
// }