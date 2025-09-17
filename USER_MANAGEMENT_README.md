# نظام إدارة المستخدمين - El-Eaida Clinic

## نظرة عامة
تم إنشاء نظام إدارة المستخدمين المتكامل الذي يتضمن:
- DTO للباك إند (C#)
- خدمة Angular للتعامل مع API
- واجهة مستخدم لإدارة المستخدمين
- معالجة التوكن عند إنشاء مستخدم جديد

## الملفات المُنشأة

### 1. Backend DTOs (C#)
- `models/UserDto.cs` - يحتوي على:
  - `UserDto` - لإنشاء مستخدم جديد
  - `UserResponseDto` - لاستقبال بيانات المستخدم
  - `LoginDto` - لتسجيل الدخول
  - `AuthResponseDto` - لاستقبال التوكن وبيانات المستخدم

### 2. API Endpoints المستخدمة
- `POST /api/Auth/register` - إنشاء مستخدم جديد
- `POST /api/auth/login` - تسجيل الدخول
- `GET /api/users` - عرض جميع المستخدمين
- `PUT /api/users/{id}` - تحديث مستخدم
- `DELETE /api/users/{id}` - حذف مستخدم
- `PATCH /api/users/{id}/toggle-status` - تغيير حالة المستخدم

### 3. Angular Services
- `src/app/core/services/user.service.ts` - خدمة شاملة للتعامل مع:
  - إنشاء مستخدم جديد مع التوكن
  - تسجيل الدخول
  - إدارة المستخدمين (عرض، تحديث، حذف)
  - إدارة التوكن والجلسة

### 4. Angular Components
- `src/app/features/admin/settings/user-management/user-management.component.ts` - مكون إدارة المستخدمين
- `src/app/features/admin/settings/user-management/add-user/add-user.component.ts` - مكون إضافة مستخدم جديد

## الميزات المُنفذة

### ✅ إنشاء مستخدم جديد
- نموذج شامل مع التحقق من صحة البيانات
- دعم الأدوار المتعددة (Admin, Doctor, Receptionist, Patient)
- معالجة التوكن تلقائياً عند الإنشاء
- رسائل نجاح وخطأ واضحة

### ✅ إدارة المستخدمين
- عرض قائمة المستخدمين من API
- فلترة حسب الدور والحالة
- بحث في أسماء المستخدمين والبريد الإلكتروني
- تفعيل/إلغاء تفعيل المستخدمين
- حذف المستخدمين

### ✅ معالجة التوكن
- حفظ التوكن في localStorage
- إرسال التوكن مع كل طلب API
- إدارة الجلسة تلقائياً
- تحديث التوكن عند الحاجة

## كيفية الاستخدام

### 1. إعداد الباك إند
تأكد من أن الباك إند يعمل على `https://localhost:7246` ويحتوي على:
- API endpoint: `POST /api/Auth/register` لإنشاء مستخدم جديد
- API endpoint: `POST /api/auth/login` لتسجيل الدخول
- API endpoint: `GET /api/users` لعرض المستخدمين
- API endpoint: `PUT /api/users/{id}` لتحديث مستخدم
- API endpoint: `DELETE /api/users/{id}` لحذف مستخدم
- API endpoint: `PATCH /api/users/{id}/toggle-status` لتغيير حالة المستخدم

### 2. استخدام النظام
1. انتقل إلى صفحة إدارة المستخدمين
2. اضغط على "إضافة مستخدم جديد"
3. املأ البيانات المطلوبة:
   - اسم المستخدم
   - البريد الإلكتروني
   - كلمة المرور (6 أحرف على الأقل)
   - رقم الهاتف
   - العنوان (اختياري)
   - الأدوار (اختر واحد أو أكثر)
4. اضغط "حفظ"
5. سيتم إنشاء المستخدم وإرسال التوكن تلقائياً

### 3. إدارة المستخدمين
- استخدم مربع البحث للبحث في المستخدمين
- استخدم الفلاتر لتصفية حسب الدور أو الحالة
- اضغط على الأزرار في عمود "الإجراءات" لإدارة المستخدمين

## هيكل البيانات

### UserDto (لإنشاء مستخدم جديد)
```csharp
{
  "username": "string",
  "email": "string", 
  "password": "string",
  "address": "string?",
  "phone": "string",
  "role": ["string"]
}
```

### UserResponseDto (استقبال بيانات المستخدم)
```csharp
{
  "id": "string",
  "username": "string",
  "email": "string",
  "address": "string?",
  "phone": "string", 
  "role": ["string"],
  "isActive": "boolean",
  "createdAt": "DateTime",
  "lastLogin": "DateTime?",
  "token": "string?"
}
```

## الأمان
- كلمات المرور محمية في النقل
- التوكن محفوظ في localStorage
- التحقق من صحة البيانات في الواجهة والخادم
- حماية من CSRF باستخدام التوكن

## ملاحظات مهمة
- تأكد من أن الباك إند يدعم CORS للسماح للفرونت إند بالوصول
- التوكن يتم حفظه تلقائياً عند إنشاء مستخدم جديد
- النظام يدعم الأدوار المتعددة للمستخدم الواحد
- جميع التواريخ معروضة بالتوقيت المحلي

## الإصلاحات المُطبقة

### ✅ إصلاح أخطاء TypeScript
- إصلاح مشكلة `EventTarget` في checkbox باستخدام `Event` مباشرة
- إصلاح مشكلة تنسيق التاريخ بإضافة `undefined` إلى نوع المعامل
- إصلاح مشكلة `styleUrls` إلى `styleUrl` في appointments-report
- تحديث API endpoint ليتطابق مع `/api/Auth/register`

### ✅ تحسينات إضافية
- إنشاء ملف CSS مفقود لـ appointments-report
- تحسين معالجة الأخطاء في جميع المكونات
- إضافة رسائل خطأ واضحة باللغة العربية

## استكشاف الأخطاء
- تحقق من اتصال الباك إند
- تأكد من صحة URL في `UserService`
- تحقق من رسائل الخطأ في وحدة التحكم
- تأكد من صحة التوكن في localStorage
- تأكد من أن الباك إند يدعم CORS للسماح للفرونت إند بالوصول
