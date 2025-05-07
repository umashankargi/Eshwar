// File: Test05_SMEF_TC1.java

class A {
    static int a = m10(); // Static variable initialization

    static int m10() {
        System.out.println("A SV"); // Static variable logic
        return 10;
    }

    static {
        System.out.println("A SB"); // Static block
    }
    

    public static void main(String[] args) {
        System.out.println("A MM"); // Main method in class A
    }
}

class B extends A {
    static int b = m20(); // Static variable initialization

    static int m20() {
        System.out.println("B SV"); // Static variable logic
        return 20;
    }

    static {
        System.out.println("B SB"); // Static block
    }

    public static void main(String[] args) {
        System.out.println("B MM"); // Main method in class B
    }
}
