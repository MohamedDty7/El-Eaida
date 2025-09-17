import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface UserDto {
  id: string;
  email: string;
  userName: string; // الباك إند يستخدم UserName
  address?: string;
  phone: string;
  role: string[]; // الآن سيحتوي على الأدوار الصحيحة من الباك إند
}
 export interface LoginDto {
  Email: string;
  Password: string;
 }
export interface RegisterRequestDto {
  Username: string;
  Email: string;
  Password: string;
  Address?: string;
  Phone: string;
  Role: string[];
}

export interface UserResponseDto {
  id: string;
  userName: string; // الباك إند يستخدم userName
  email: string;
  address?: string;
  phone: string;
  role: string[]; // الآن سيحتوي على الأدوار الصحيحة
  isActive?: boolean;
  createdAt?: Date;
  lastLogin?: Date;
  token?: string;
}

export interface AuthResponseDto {
  token: string;
  user: UserResponseDto;
  expiresAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_URL = 'https://localhost:7246/api';
  private currentUserSubject = new BehaviorSubject<UserResponseDto | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // تحميل المستخدم من localStorage عند بدء التطبيق
    this.loadUserFromStorage();
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  private loadUserFromStorage(): void {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('خطأ في تحميل المستخدم من التخزين:', error);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
      }
    }
  }

  // إنشاء مستخدم جديد
  createUser(userDto: RegisterRequestDto): Observable<AuthResponseDto> {
    console.log('إنشاء مستخدم جديد:', userDto);
    
    return this.http.post<AuthResponseDto>(`${this.API_URL}/Auth/register`, userDto, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }).pipe(
      tap(response => {
        console.log('تم إنشاء المستخدم:', response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
      })
    );
  }

  // تسجيل الدخول
  login(username: string, password: string): Observable<AuthResponseDto> {
    const loginData: LoginDto = { 
      Email: username,
      Password: password 
    };
    console.log('تسجيل الدخول:', loginData);
    
    return this.http.post<AuthResponseDto>(`${this.API_URL}/Auth/login`, loginData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }).pipe(
      tap(response => {
        console.log('تم تسجيل الدخول:', response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
      })
    );
  }

  // الحصول على جميع المستخدمين
  getUsers(): Observable<UserResponseDto[]> {
    return this.http.get<UserResponseDto[]>(`${this.API_URL}/Auth/getallusers`, {
      headers: this.getHeaders()
    });
  }

  // الحصول على جميع المستخدمين من Auth API
  getAllUsers(): Observable<UserResponseDto[]> {
    console.log('جاري تحميل المستخدمين من API');
    return this.http.get<UserResponseDto[]>(`${this.API_URL}/Auth/getallusers`, {
      headers: this.getHeaders()
    });
  }

  // الحصول على مستخدم واحد بالمعرف من Auth API
  getUserById(id: string): Observable<UserResponseDto> {
    return this.http.get<UserResponseDto>(`${this.API_URL}/Auth/getbyid/${id}`, {
      headers: this.getHeaders()
    });
  }


  // تحديث مستخدم
  updateUser(id: string, userDto: Partial<UserDto>): Observable<UserResponseDto> {
    return this.http.put<UserResponseDto>(`${this.API_URL}/users/${id}`, userDto, {
      headers: this.getHeaders()
    }).pipe(
      tap(updatedUser => {
        const currentUser = this.currentUserSubject.value;
        if (currentUser && currentUser.id === id) {
          this.currentUserSubject.next(updatedUser);
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        }
      })
    );
  }

  // حذف مستخدم
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/users/${id}`, {
      headers: this.getHeaders()
    });
  }

  // تفعيل/إلغاء تفعيل مستخدم
  toggleUserStatus(id: string): Observable<UserResponseDto> {
    return this.http.patch<UserResponseDto>(`${this.API_URL}/Auth/toggle-status/${id}`, {}, {
      headers: this.getHeaders()
    });
  }

  // تسجيل الخروج
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  // الحصول على المستخدم الحالي
  getCurrentUser(): UserResponseDto | null {
    return this.currentUserSubject.value;
  }

  // التحقق من وجود توكن صالح
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  // الحصول على التوكن
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // تحديث التوكن
  refreshToken(): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.API_URL}/auth/refresh`, {}, {
      headers: this.getHeaders()
    }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
      })
    );
  }

  // تسجيل الدخول مع التحقق من النجاح
  loginWithValidation(username: string, password: string): Observable<boolean> {
    return new Observable(observer => {
      this.login(username, password).subscribe({
        next: (response) => {
          console.log('تم تسجيل الدخول بنجاح:', response);
          observer.next(true);
          observer.complete();
        },
        error: (error) => {
          console.error('فشل تسجيل الدخول:', error);
          observer.next(false);
          observer.complete();
        }
      });
    });
  }
}
